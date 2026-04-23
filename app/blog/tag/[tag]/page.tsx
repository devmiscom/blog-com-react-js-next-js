/**
 * /blog/tag/[tag] - Posts filtered by tag
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByTag, getAllPosts } from '@/lib/posts';
import { generateSeoMetadata } from '@/lib/seoMetaTags';
import PostCard from '@/app/components/PostCard';
import Link from 'next/link';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  return generateSeoMetadata({
    title: `Tag: ${decoded}`,
    description: `Leia todos os artigos com a tag ${decoded} no nosso blog.`,
    keywords: [decoded, 'blog', 'artigos'],
    url: `/blog/tag/${tag}`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

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
            <span>Tag</span>
          </nav>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Tag: #{decoded}
          </h1>
          <p className="text-lg text-blue-100">
            {posts.length} {posts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'} com esta tag.
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
