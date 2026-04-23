/**
 * Home page with SEO optimization
 */

import { Metadata } from 'next';
import { generateSeoMetadata } from '@/lib/seoMetaTags';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/app/components/PostCard';
import Link from 'next/link';

export const metadata: Metadata = generateSeoMetadata({
  title: 'Bem-vindo ao nosso Blog',
  description: 'Um blog moderno otimizado para SEO, desenvolvido com Next.js. Leia artigos sobre tecnologia, programação e muito mais.',
  keywords: ['blog', 'tecnologia', 'programação', 'artigos', 'Next.js'],
  url: '/',
  type: 'website',
});

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="mb-6 text-5xl font-bold md:text-6xl">
            Bem-vindo ao nosso Blog
          </h1>
          <p className="mb-8 text-xl text-blue-100">
            Um blog moderno otimizado para SEO, desenvolvido com Next.js. Leia artigos sobre tecnologia, programação e muito mais.
          </p>
          <Link
            href="/blog"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Explorar Blog →
          </Link>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Últimos Artigos</h2>
          <p className="text-gray-600">Leia nossos posts mais recentes</p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600 mb-4">Nenhum artigo publicado ainda.</p>
            <Link href="/blog" className="text-blue-600 hover:underline">
              Ver todos os artigos →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-block rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Ver todos os artigos →
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Por que escolher nosso blog?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Otimizado para SEO</h3>
              <p className="text-gray-600">
                Com meta tags, JSON-LD schema, sitemap e robots.txt perfeitamente configurados.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4 text-4xl">🚀</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Rápido e Responsivo</h3>
              <p className="text-gray-600">
                Construído com Next.js para performance excepcional em todos os dispositivos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4 text-4xl">📱</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Mobile-Friendly</h3>
              <p className="text-gray-600">
                Design responsivo que funciona perfeitamente em celulares, tablets e desktops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Comece a ler agora</h2>
          <p className="mb-8 text-lg text-blue-100">
            Explore nossos artigos e aprenda coisas novas todos os dias.
          </p>
          <Link
            href="/blog"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Ir para o Blog →
          </Link>
        </div>
      </section>
    </main>
  );
}
