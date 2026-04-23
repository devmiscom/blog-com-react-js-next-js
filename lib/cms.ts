import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { randomUUID } from 'crypto';
import { dirname, join } from 'path';
import slugify from 'slugify';
import { Category, CreateCategoryInput, CreatePageInput, CreateTagInput, Page, Post, Tag } from './types';

const contentDir = join(process.cwd(), 'content');
const categoriesDir = join(contentDir, 'categories');
const tagsDir = join(contentDir, 'tags');
const pagesDir = join(contentDir, 'pages');
const postsDir = join(contentDir, 'posts');

const categoriesFile = join(categoriesDir, 'categories.json');
const tagsFile = join(tagsDir, 'tags.json');
const pagesFile = join(pagesDir, 'pages.json');
const postsFile = join(postsDir, 'posts.json');

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function ensureFile(file: string, defaultValue: unknown) {
  const dir = dirname(file);
  ensureDir(dir);

  if (!existsSync(file)) {
    writeFileSync(file, JSON.stringify(defaultValue, null, 2));
  }
}

function readJson<T>(file: string, fallback: T): T {
  ensureFile(file, fallback);
  return JSON.parse(readFileSync(file, 'utf-8')) as T;
}

function writeJson(file: string, data: unknown) {
  writeFileSync(file, JSON.stringify(data, null, 2));
}

function toSlug(value: string) {
  return slugify(value, { lower: true, strict: true });
}

function generatePrefixedId(prefix: string) {
  return `${prefix}_${randomUUID()}`;
}

function readPosts(): Post[] {
  return readJson<Post[]>(postsFile, []);
}

function writePosts(posts: Post[]) {
  writeJson(postsFile, posts);
}

export function syncTaxonomiesFromPosts() {
  const posts = readPosts();
  const categories = readJson<Category[]>(categoriesFile, []);
  const tags = readJson<Tag[]>(tagsFile, []);
  const now = new Date();

  const existingCategoryNames = new Set(categories.map((item) => item.name.toLowerCase()));
  const existingTagNames = new Set(tags.map((item) => item.name.toLowerCase()));

  const newCategories = [...categories];
  const newTags = [...tags];

  posts.forEach((post) => {
    const categoryName = post.category.trim();
    if (categoryName && !existingCategoryNames.has(categoryName.toLowerCase())) {
      existingCategoryNames.add(categoryName.toLowerCase());
      newCategories.push({
        id: generatePrefixedId('cat'),
        name: categoryName,
        slug: toSlug(categoryName),
        description: '',
        createdAt: now,
        updatedAt: now,
      });
    }

    post.tags.forEach((tagNameRaw) => {
      const tagName = tagNameRaw.trim();
      if (tagName && !existingTagNames.has(tagName.toLowerCase())) {
        existingTagNames.add(tagName.toLowerCase());
        newTags.push({
          id: generatePrefixedId('tag'),
          name: tagName,
          slug: toSlug(tagName),
          createdAt: now,
          updatedAt: now,
        });
      }
    });
  });

  writeJson(categoriesFile, newCategories);
  writeJson(tagsFile, newTags);
}

export function getAllCategories(): Category[] {
  syncTaxonomiesFromPosts();
  return readJson<Category[]>(categoriesFile, []).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export function createCategory(input: CreateCategoryInput): Category {
  const name = input.name.trim();
  if (!name) {
    throw new Error('Nome da categoria é obrigatório');
  }

  const categories = readJson<Category[]>(categoriesFile, []);
  const duplicate = categories.some((item) => item.name.toLowerCase() === name.toLowerCase());
  if (duplicate) {
    throw new Error('Categoria já existe');
  }

  const now = new Date();
  const category: Category = {
    id: generatePrefixedId('cat'),
    name,
    slug: toSlug(name),
    description: input.description?.trim() || '',
    createdAt: now,
    updatedAt: now,
  };

  categories.push(category);
  writeJson(categoriesFile, categories);
  return category;
}

export function updateCategory(id: string, input: Partial<CreateCategoryInput>): Category | null {
  const categories = readJson<Category[]>(categoriesFile, []);
  const index = categories.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const current = categories[index];
  const nextName = input.name?.trim() || current.name;
  const duplicate = categories.some(
    (item) => item.id !== id && item.name.toLowerCase() === nextName.toLowerCase()
  );

  if (duplicate) {
    throw new Error('Categoria já existe');
  }

  const updated: Category = {
    ...current,
    name: nextName,
    slug: toSlug(nextName),
    description: input.description?.trim() ?? current.description,
    updatedAt: new Date(),
  };

  categories[index] = updated;
  writeJson(categoriesFile, categories);
  return updated;
}

export function deleteCategory(id: string): { success: boolean; error?: string } {
  const categories = readJson<Category[]>(categoriesFile, []);
  const category = categories.find((item) => item.id === id);

  if (!category) {
    return { success: false, error: 'Categoria não encontrada' };
  }

  const posts = readPosts();
  const hasDependencies = posts.some(
    (post) => post.category.toLowerCase() === category.name.toLowerCase()
  );

  if (hasDependencies) {
    return { success: false, error: 'Categoria está em uso por posts' };
  }

  writeJson(
    categoriesFile,
    categories.filter((item) => item.id !== id)
  );
  return { success: true };
}

export function getAllTags(): Tag[] {
  syncTaxonomiesFromPosts();
  return readJson<Tag[]>(tagsFile, []).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export function createTag(input: CreateTagInput): Tag {
  const name = input.name.trim();
  if (!name) {
    throw new Error('Nome da tag é obrigatório');
  }

  const tags = readJson<Tag[]>(tagsFile, []);
  const duplicate = tags.some((item) => item.name.toLowerCase() === name.toLowerCase());
  if (duplicate) {
    throw new Error('Tag já existe');
  }

  const now = new Date();
  const tag: Tag = {
    id: generatePrefixedId('tag'),
    name,
    slug: toSlug(name),
    createdAt: now,
    updatedAt: now,
  };

  tags.push(tag);
  writeJson(tagsFile, tags);
  return tag;
}

export function updateTag(id: string, input: Partial<CreateTagInput>): Tag | null {
  const tags = readJson<Tag[]>(tagsFile, []);
  const index = tags.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const current = tags[index];
  const nextName = input.name?.trim() || current.name;
  const duplicate = tags.some((item) => item.id !== id && item.name.toLowerCase() === nextName.toLowerCase());

  if (duplicate) {
    throw new Error('Tag já existe');
  }

  const updated: Tag = {
    ...current,
    name: nextName,
    slug: toSlug(nextName),
    updatedAt: new Date(),
  };

  tags[index] = updated;
  writeJson(tagsFile, tags);

  const posts = readPosts();
  const normalizedCurrent = current.name.toLowerCase();
  const updatedPosts = posts.map((post) => ({
    ...post,
    tags: post.tags.map((tag) => (tag.toLowerCase() === normalizedCurrent ? updated.name : tag)),
  }));
  writePosts(updatedPosts);

  return updated;
}

export function deleteTag(id: string): { success: boolean; error?: string } {
  const tags = readJson<Tag[]>(tagsFile, []);
  const tag = tags.find((item) => item.id === id);

  if (!tag) {
    return { success: false, error: 'Tag não encontrada' };
  }

  writeJson(
    tagsFile,
    tags.filter((item) => item.id !== id)
  );

  const posts = readPosts();
  const normalized = tag.name.toLowerCase();
  const updatedPosts = posts.map((post) => ({
    ...post,
    tags: post.tags.filter((item) => item.toLowerCase() !== normalized),
  }));
  writePosts(updatedPosts);

  return { success: true };
}

export function ensurePostTaxonomies(category: string, tags: string[]) {
  const normalizedCategory = category.trim();
  if (normalizedCategory) {
    const categories = readJson<Category[]>(categoriesFile, []);
    const exists = categories.some((item) => item.name.toLowerCase() === normalizedCategory.toLowerCase());
    if (!exists) {
      categories.push({
        id: generatePrefixedId('cat'),
        name: normalizedCategory,
        slug: toSlug(normalizedCategory),
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      writeJson(categoriesFile, categories);
    }
  }

  if (tags.length > 0) {
    const allTags = readJson<Tag[]>(tagsFile, []);
    const known = new Set(allTags.map((item) => item.name.toLowerCase()));
    const toAppend: Tag[] = [];

    tags
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((tagName) => {
        if (!known.has(tagName.toLowerCase())) {
          known.add(tagName.toLowerCase());
          toAppend.push({
            id: generatePrefixedId('tag'),
            name: tagName,
            slug: toSlug(tagName),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });

    if (toAppend.length > 0) {
      writeJson(tagsFile, [...allTags, ...toAppend]);
    }
  }
}

export function getAllPages(): Page[] {
  return readJson<Page[]>(pagesFile, []).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getPageBySlug(slug: string): Page | null {
  const pages = readJson<Page[]>(pagesFile, []);
  return pages.find((item) => item.slug === slug) || null;
}

export function createPage(input: CreatePageInput): Page {
  const title = input.title.trim();
  if (!title) {
    throw new Error('Título da página é obrigatório');
  }

  const pages = readJson<Page[]>(pagesFile, []);
  const slug = toSlug(title);
  if (pages.some((item) => item.slug === slug)) {
    throw new Error('Já existe uma página com este título');
  }

  const now = new Date();
  const page: Page = {
    id: generatePrefixedId('page'),
    title,
    slug,
    description: input.description.trim(),
    content: input.content,
    showInNavigation: input.showInNavigation ?? true,
    publishedAt: now,
    updatedAt: now,
  };

  pages.push(page);
  writeJson(pagesFile, pages);
  return page;
}

export function updatePage(id: string, input: Partial<CreatePageInput>): Page | null {
  const pages = readJson<Page[]>(pagesFile, []);
  const index = pages.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const current = pages[index];
  const nextTitle = input.title?.trim() || current.title;
  const nextSlug = toSlug(nextTitle);

  const duplicate = pages.some((item) => item.id !== id && item.slug === nextSlug);
  if (duplicate) {
    throw new Error('Já existe uma página com este título');
  }

  const updated: Page = {
    ...current,
    title: nextTitle,
    slug: nextSlug,
    description: input.description?.trim() ?? current.description,
    content: input.content ?? current.content,
    showInNavigation: input.showInNavigation ?? current.showInNavigation,
    updatedAt: new Date(),
  };

  pages[index] = updated;
  writeJson(pagesFile, pages);
  return updated;
}

export function deletePage(id: string): boolean {
  const pages = readJson<Page[]>(pagesFile, []);
  const nextPages = pages.filter((item) => item.id !== id);

  if (nextPages.length === pages.length) {
    return false;
  }

  writeJson(pagesFile, nextPages);
  return true;
}
