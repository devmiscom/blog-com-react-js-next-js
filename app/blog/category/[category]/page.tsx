/**
 * /blog/category/[category] - Posts filtered by category
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllPosts } from '@/lib/posts';
import { generateSeoMetadata } from '@/lib/seoMetaTags';
import PostCard from '@/app/components/PostCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);

  return generateSeoMetadata({
    title: `Categoria: ${decoded}`,
    description: `Leia todos os artigos sobre ${decoded} no nosso blog.`,
    keywords: [decoded, 'blog', 'artigos'],
    url: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getPostsByCategory(decoded);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <nav className="mb-4 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span>Categoria</span>
          </nav>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Categoria: {decoded}
          </h1>
          <p className="text-lg text-blue-100">
            {posts.length} {posts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'} nesta categoria.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-block rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            ← Ver todos os artigos
          </Link>
        </div>
      </section>
    </div>
  );
}
