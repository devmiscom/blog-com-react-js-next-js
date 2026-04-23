'use client';

import { useEffect, useMemo, useState } from 'react';

type Tab = 'posts' | 'categories' | 'tags' | 'pages';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface PostItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  metadata: {
    title: string;
    description: string;
    keywords?: string[];
    robots?: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow';
  };
}

interface CategoryItem {
  id: string;
  name: string;
  description?: string;
}

interface TagItem {
  id: string;
  name: string;
}

interface PageItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  showInNavigation: boolean;
}

const defaultPostForm = {
  id: '',
  title: '',
  excerpt: '',
  content: '',
  author: '',
  category: '',
  tags: '',
  featuredImage: '',
  featuredImageAlt: '',
  metadataTitle: '',
  metadataDescription: '',
  metadataKeywords: '',
  metadataRobots: 'index, follow',
};

const defaultPageForm = {
  id: '',
  title: '',
  description: '',
  content: '',
  showInNavigation: true,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [pages, setPages] = useState<PageItem[]>([]);

  const [postForm, setPostForm] = useState(defaultPostForm);
  const [categoryForm, setCategoryForm] = useState({ id: '', name: '', description: '' });
  const [tagForm, setTagForm] = useState({ id: '', name: '' });
  const [pageForm, setPageForm] = useState(defaultPageForm);

  const isEditingPost = useMemo(() => Boolean(postForm.id), [postForm.id]);
  const isEditingCategory = useMemo(() => Boolean(categoryForm.id), [categoryForm.id]);
  const isEditingTag = useMemo(() => Boolean(tagForm.id), [tagForm.id]);
  const isEditingPage = useMemo(() => Boolean(pageForm.id), [pageForm.id]);

  async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, { cache: 'no-store' });
    const payload = (await response.json()) as ApiResponse<T>;

    if (!response.ok || !payload.success) {
      throw new Error(payload.error || 'Erro ao carregar dados');
    }

    return payload.data;
  }

  async function loadAllData() {
    setLoading(true);
    setError('');
    try {
      const [postList, categoryList, tagList, pageList] = await Promise.all([
        fetchJson<PostItem[]>('/api/posts'),
        fetchJson<CategoryItem[]>('/api/categories'),
        fetchJson<TagItem[]>('/api/tags'),
        fetchJson<PageItem[]>('/api/pages'),
      ]);

      setPosts(postList);
      setCategories(categoryList);
      setTags(tagList);
      setPages(pageList);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar dados do painel');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAllData();
  }, []);

  function clearMessages() {
    setError('');
    setSuccess('');
  }

  async function submitPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();

    if (!postForm.title || !postForm.excerpt || !postForm.content || !postForm.author || !postForm.category) {
      setError('Preencha título, resumo, conteúdo, autor e categoria');
      return;
    }

    const payload = {
      title: postForm.title,
      excerpt: postForm.excerpt,
      content: postForm.content,
      author: postForm.author,
      category: postForm.category,
      tags: postForm.tags.split(',').map((item) => item.trim()).filter(Boolean),
      featuredImage: postForm.featuredImage,
      featuredImageAlt: postForm.featuredImageAlt,
      metadata: {
        title: postForm.metadataTitle || postForm.title,
        description: postForm.metadataDescription || postForm.excerpt,
        keywords: postForm.metadataKeywords
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        robots: postForm.metadataRobots,
      },
    };

    const endpoint = isEditingPost ? `/api/posts/${postForm.id}` : '/api/posts';
    const method = isEditingPost ? 'PUT' : 'POST';

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.error || 'Falha ao salvar post');
      return;
    }

    setSuccess(isEditingPost ? 'Post atualizado com sucesso' : 'Post criado com sucesso');
    setPostForm(defaultPostForm);
    await loadAllData();
  }

  async function removePost(id: string) {
    clearMessages();
    if (!window.confirm('Tem certeza que deseja excluir este post?')) {
      return;
    }
    const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.error || 'Falha ao remover post');
      return;
    }

    setSuccess('Post removido com sucesso');
    await loadAllData();
  }

  async function editPost(post: PostItem) {
    let fullPost = post;
    if (!post.content) {
      const response = await fetch(`/api/posts/${post.id}`, { cache: 'no-store' });
      const payload = await response.json();
      if (response.ok && payload.success) {
        fullPost = payload.data as PostItem;
      }
    }

    setPostForm({
      id: fullPost.id,
      title: fullPost.title,
      excerpt: fullPost.excerpt,
      content: fullPost.content || '',
      author: fullPost.author,
      category: fullPost.category,
      tags: fullPost.tags.join(', '),
      featuredImage: fullPost.featuredImage || '',
      featuredImageAlt: fullPost.featuredImageAlt || '',
      metadataTitle: fullPost.metadata?.title || '',
      metadataDescription: fullPost.metadata?.description || '',
      metadataKeywords: fullPost.metadata?.keywords?.join(', ') || '',
      metadataRobots: fullPost.metadata?.robots || 'index, follow',
    });
    setActiveTab('posts');
  }

  async function submitCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();

    if (!categoryForm.name.trim()) {
      setError('Nome da categoria é obrigatório');
      return;
    }

    const endpoint = isEditingCategory ? `/api/categories/${categoryForm.id}` : '/api/categories';
    const method = isEditingCategory ? 'PUT' : 'POST';
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryForm.name, description: categoryForm.description }),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.error || 'Falha ao salvar categoria');
      return;
    }

    setSuccess(isEditingCategory ? 'Categoria atualizada com sucesso' : 'Categoria criada com sucesso');
    setCategoryForm({ id: '', name: '', description: '' });
    await loadAllData();
  }

  async function removeCategory(id: string) {
    clearMessages();
    if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      return;
    }
    const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.error || 'Falha ao remover categoria');
      return;
    }

    setSuccess('Categoria removida com sucesso');
    await loadAllData();
  }

  async function submitTag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();

    if (!tagForm.name.trim()) {
      setError('Nome da tag é obrigatório');
      return;
    }

    const endpoint = isEditingTag ? `/api/tags/${tagForm.id}` : '/api/tags';
    const method = isEditingTag ? 'PUT' : 'POST';
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: tagForm.name }),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.error || 'Falha ao salvar tag');
      return;
    }

    setSuccess(isEditingTag ? 'Tag atualizada com sucesso' : 'Tag criada com sucesso');
    setTagForm({ id: '', name: '' });
    await loadAllData();
  }

  async function removeTag(id: string) {
    clearMessages();
    if (!window.confirm('Tem certeza que deseja excluir esta tag?')) {
      return;
    }
    const response = await fetch(`/api/tags/${id}`, { method: 'DELETE' });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.error || 'Falha ao remover tag');
      return;
    }

    setSuccess('Tag removida com sucesso');
    await loadAllData();
  }

  async function submitPage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();

    if (!pageForm.title.trim() || !pageForm.description.trim() || !pageForm.content.trim()) {
      setError('Preencha título, descrição e conteúdo da página');
      return;
    }

    const endpoint = isEditingPage ? `/api/pages/${pageForm.id}` : '/api/pages';
    const method = isEditingPage ? 'PUT' : 'POST';
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: pageForm.title,
        description: pageForm.description,
        content: pageForm.content,
        showInNavigation: pageForm.showInNavigation,
      }),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.error || 'Falha ao salvar página');
      return;
    }

    setSuccess(isEditingPage ? 'Página atualizada com sucesso' : 'Página criada com sucesso');
    setPageForm(defaultPageForm);
    await loadAllData();
  }

  async function removePage(id: string) {
    clearMessages();
    if (!window.confirm('Tem certeza que deseja excluir esta página?')) {
      return;
    }
    const response = await fetch(`/api/pages/${id}`, { method: 'DELETE' });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.error || 'Falha ao remover página');
      return;
    }

    setSuccess('Página removida com sucesso');
    await loadAllData();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="mb-6 text-gray-600">Gerencie posts, categorias, tags e páginas.</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            ['posts', 'Posts'],
            ['categories', 'Categorias'],
            ['tags', 'Tags'],
            ['pages', 'Páginas'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key as Tab)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                activeTab === key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">{error}</div>}
        {success && <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">{success}</div>}
        {loading && <div className="mb-4 rounded-lg bg-blue-100 px-4 py-3 text-sm text-blue-700">Carregando...</div>}

        {activeTab === 'posts' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <form onSubmit={submitPost} className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {isEditingPost ? 'Editar Post' : 'Novo Post'}
              </h2>
              <div className="space-y-3">
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Título"
                  value={postForm.title}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, title: event.target.value }))}
                />
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Resumo"
                  rows={2}
                  value={postForm.excerpt}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, excerpt: event.target.value }))}
                />
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Conteúdo (HTML ou texto)"
                  rows={8}
                  value={postForm.content}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, content: event.target.value }))}
                />
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Autor"
                  value={postForm.author}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, author: event.target.value }))}
                />
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Categoria"
                  list="category-suggestions"
                  value={postForm.category}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, category: event.target.value }))}
                />
                <datalist id="category-suggestions">
                  {categories.map((category) => (
                    <option key={category.id} value={category.name} />
                  ))}
                </datalist>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Tags separadas por vírgula"
                  value={postForm.tags}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, tags: event.target.value }))}
                />
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="URL da imagem destacada"
                  value={postForm.featuredImage}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, featuredImage: event.target.value }))}
                />
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Texto alternativo da imagem"
                  value={postForm.featuredImageAlt}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, featuredImageAlt: event.target.value }))}
                />
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Meta title"
                  value={postForm.metadataTitle}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, metadataTitle: event.target.value }))}
                />
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Meta description"
                  rows={2}
                  value={postForm.metadataDescription}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, metadataDescription: event.target.value }))}
                />
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Meta keywords (vírgula)"
                  value={postForm.metadataKeywords}
                  onChange={(event) => setPostForm((prev) => ({ ...prev, metadataKeywords: event.target.value }))}
                />
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  value={postForm.metadataRobots}
                  onChange={(event) =>
                    setPostForm((prev) => ({
                      ...prev,
                      metadataRobots: event.target.value as typeof defaultPostForm.metadataRobots,
                    }))
                  }
                >
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
              <div className="mt-4 flex gap-2">
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                  {isEditingPost ? 'Atualizar Post' : 'Criar Post'}
                </button>
                {isEditingPost && (
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700"
                    onClick={() => setPostForm(defaultPostForm)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Posts cadastrados ({posts.length})</h2>
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="rounded-lg border border-gray-200 p-3">
                    <p className="font-semibold text-gray-900">{post.title}</p>
                    <p className="text-sm text-gray-600">{post.category}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                        onClick={() => {
                          void editPost(post);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                        onClick={() => {
                          void removePost(post.id);
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'categories' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <form onSubmit={submitCategory} className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {isEditingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </h2>
              <input
                className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Nome da categoria"
                value={categoryForm.name}
                onChange={(event) => setCategoryForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Descrição"
                rows={3}
                value={categoryForm.description}
                onChange={(event) => setCategoryForm((prev) => ({ ...prev, description: event.target.value }))}
              />
              <div className="mt-4 flex gap-2">
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                  {isEditingCategory ? 'Atualizar' : 'Criar'}
                </button>
                {isEditingCategory && (
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                    onClick={() => setCategoryForm({ id: '', name: '', description: '' })}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Categorias cadastradas ({categories.length})
              </h2>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="rounded-lg border border-gray-200 p-3">
                    <p className="font-semibold text-gray-900">{category.name}</p>
                    {category.description && <p className="text-sm text-gray-600">{category.description}</p>}
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                        onClick={() =>
                          setCategoryForm({
                            id: category.id,
                            name: category.name,
                            description: category.description || '',
                          })
                        }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                        onClick={() => {
                          void removeCategory(category.id);
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'tags' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <form onSubmit={submitTag} className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {isEditingTag ? 'Editar Tag' : 'Nova Tag'}
              </h2>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Nome da tag"
                value={tagForm.name}
                onChange={(event) => setTagForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <div className="mt-4 flex gap-2">
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                  {isEditingTag ? 'Atualizar' : 'Criar'}
                </button>
                {isEditingTag && (
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                    onClick={() => setTagForm({ id: '', name: '' })}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Tags cadastradas ({tags.length})</h2>
              <div className="space-y-3">
                {tags.map((tag) => (
                  <div key={tag.id} className="rounded-lg border border-gray-200 p-3">
                    <p className="font-semibold text-gray-900">{tag.name}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                        onClick={() => setTagForm({ id: tag.id, name: tag.name })}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                        onClick={() => {
                          void removeTag(tag.id);
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'pages' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <form onSubmit={submitPage} className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {isEditingPage ? 'Editar Página' : 'Nova Página'}
              </h2>
              <input
                className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Título da página"
                value={pageForm.title}
                onChange={(event) => setPageForm((prev) => ({ ...prev, title: event.target.value }))}
              />
              <textarea
                className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Descrição"
                rows={2}
                value={pageForm.description}
                onChange={(event) => setPageForm((prev) => ({ ...prev, description: event.target.value }))}
              />
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Conteúdo da página"
                rows={10}
                value={pageForm.content}
                onChange={(event) => setPageForm((prev) => ({ ...prev, content: event.target.value }))}
              />
              <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={pageForm.showInNavigation}
                  onChange={(event) =>
                    setPageForm((prev) => ({ ...prev, showInNavigation: event.target.checked }))
                  }
                />
                Exibir na navegação
              </label>
              <div className="mt-4 flex gap-2">
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                  {isEditingPage ? 'Atualizar' : 'Criar'}
                </button>
                {isEditingPage && (
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 px-4 py-2"
                    onClick={() => setPageForm(defaultPageForm)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Páginas cadastradas ({pages.length})</h2>
              <div className="space-y-3">
                {pages.map((page) => (
                  <div key={page.id} className="rounded-lg border border-gray-200 p-3">
                    <p className="font-semibold text-gray-900">{page.title}</p>
                    <p className="text-xs text-gray-500">/{page.slug}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                        onClick={() =>
                          setPageForm({
                            id: page.id,
                            title: page.title,
                            description: page.description,
                            content: page.content,
                            showInNavigation: page.showInNavigation,
                          })
                        }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="rounded bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                        onClick={() => {
                          void removePage(page.id);
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
