/**
 * /blog/[slug] - Individual blog post page
 * Using SSG (Static Site Generation) for best SEO
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs, incrementPostViews } from '@/lib/posts';
import { generatePostMetadata, generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/seoMetaTags';
import PostContent from '@/app/components/PostContent';
import { seoConfig } from '@/lib/seoConfig';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all posts (ISR - Incremental Static Regeneration)
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'O artigo que você está procurando não existe.',
    };
  }

  return generatePostMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Generate JSON-LD schema
  const blogSchema = generateBlogPostSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: seoConfig.siteUrl },
    { name: 'Blog', url: `${seoConfig.siteUrl}/blog` },
    { name: post.title, url: `${seoConfig.siteUrl}/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/blog" className="text-blue-600 hover:underline">
                Blog
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12">
        <PostContent post={post} />
      </main>

      {/* Related Posts Section */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Mais artigos</h2>
          <p className="text-gray-600">
            <Link href="/blog" className="text-blue-600 hover:underline">
              ← Voltar para o blog
            </Link>
          </p>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="bg-gray-50 py-8 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-sm text-gray-600">
            Última atualização: {new Date(post.updatedAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </footer>
    </div>
  );
}
