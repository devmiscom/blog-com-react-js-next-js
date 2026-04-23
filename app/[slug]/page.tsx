import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPages, getPageBySlug } from '@/lib/cms';
import { generateSeoMetadata } from '@/lib/seoMetaTags';

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
    };
  }

  return generateSeoMetadata({
    title: page.title,
    description: page.description,
    url: `/${page.slug}`,
    keywords: [page.title, 'página'],
    type: 'website',
  });
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-4 py-16">
        <article className="rounded-xl border border-gray-200 bg-white p-8">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">{page.title}</h1>
          <p className="mb-8 text-gray-600">{page.description}</p>
          <div className="prose prose-lg max-w-none whitespace-pre-wrap text-gray-800">{page.content}</div>
        </article>
      </section>
    </main>
  );
}
