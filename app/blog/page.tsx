/**
 * /blog - Blog listing page
 */

import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { generateSeoMetadata } from '@/lib/seoMetaTags';
import PostCard from '@/app/components/PostCard';
import { seoConfig } from '@/lib/seoConfig';

export const metadata: Metadata = generateSeoMetadata({
  title: 'Blog',
  description: 'Leia nossos últimos artigos e notícias sobre tecnologia, programação e muito mais.',
  keywords: ['blog', 'artigos', 'notícias', 'tecnologia'],
  url: '/blog',
  type: 'website',
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="text-lg text-blue-100">
            Leia nossos últimos artigos e notícias sobre tecnologia, programação e muito mais.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">Nenhum artigo publicado ainda.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-lg border border-gray-200 bg-blue-50 p-6">
            <h2 className="mb-2 text-xl font-bold text-gray-900">Total de artigos</h2>
            <p className="text-gray-600">
              Atualmente temos <strong>{posts.length}</strong> artigos publicados no blog.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
