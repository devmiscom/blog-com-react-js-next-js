/**
 * Seed data - Create sample posts for testing
 * Run: node scripts/seed.js
 */

import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const POSTS_FILE = path.join(POSTS_DIR, 'posts.json');

const samplePosts = [
  {
    id: '1',
    title: 'Como começar com Next.js SEO',
    slug: 'como-comecar-com-nextjs-seo',
    excerpt: 'Um guia completo para otimizar sua aplicação Next.js para mecanismos de busca desde o início.',
    content: `<h2>Introdução</h2>
<p>Next.js é um framework React poderoso que oferece excelentes recursos para SEO. Neste artigo, vamos explorar as melhores práticas para otimizar seu site Next.js para mecanismos de busca.</p>

<h2>1. Configurar Meta Tags</h2>
<p>As meta tags são essenciais para SEO. Com Next.js, você pode facilmente configurar meta tags usando a função generateMetadata().</p>

<h2>2. Usar Static Site Generation (SSG)</h2>
<p>SSG é uma ótima estratégia para sites com conteúdo estático. Pre-renderiza páginas em tempo de build, melhorando a performance e SEO.</p>

<h2>3. Implementar JSON-LD Schema</h2>
<p>JSON-LD ajuda os mecanismos de busca a entender o conteúdo da sua página.</p>

<h2>Conclusão</h2>
<p>Seguindo essas práticas, você terá um site Next.js bem otimizado para SEO.</p>`,
    author: 'Seu Nome',
    category: 'Tecnologia',
    tags: ['Next.js', 'SEO', 'React'],
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324ef6df?w=800&h=400&fit=crop',
    featuredImageAlt: 'Next.js e SEO',
    metadata: {
      title: 'Como começar com Next.js SEO',
      description: 'Um guia completo para otimizar sua aplicação Next.js para mecanismos de busca desde o início.',
      keywords: ['Next.js', 'SEO', 'otimização'],
      robots: 'index, follow',
    },
    publishedAt: new Date('2026-04-20'),
    updatedAt: new Date('2026-04-20'),
    readingTime: 8,
    views: 150,
  },
  {
    id: '2',
    title: 'Otimização de imagens em Next.js',
    slug: 'otimizacao-de-imagens-em-nextjs',
    excerpt: 'Aprenda como otimizar imagens em Next.js para melhorar performance e SEO.',
    content: `<h2>Por que otimizar imagens?</h2>
<p>Imagens não otimizadas podem ser um grande problema para performance do seu site. Com Next.js, você tem ferramentas poderosas para otimizar imagens.</p>

<h2>Usando Next.js Image Component</h2>
<p>O componente Image do Next.js automáticamente otimiza suas imagens.</p>

<h2>WebP Format</h2>
<p>WebP é um formato mais eficiente que PNG ou JPEG. Next.js suporta WebP automaticamente.</p>

<h2>Lazy Loading</h2>
<p>Carregar imagens sob demanda (lazy loading) melhora muito a performance inicial da página.</p>`,
    author: 'Seu Nome',
    category: 'Performance',
    tags: ['Next.js', 'Imagens', 'Performance'],
    featuredImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop',
    featuredImageAlt: 'Otimização de imagens',
    metadata: {
      title: 'Otimização de imagens em Next.js',
      description: 'Aprenda como otimizar imagens em Next.js para melhorar performance e SEO.',
      keywords: ['Next.js', 'imagens', 'performance', 'WebP'],
      robots: 'index, follow',
    },
    publishedAt: new Date('2026-04-19'),
    updatedAt: new Date('2026-04-19'),
    readingTime: 6,
    views: 120,
  },
  {
    id: '3',
    title: 'Schema Markup e JSON-LD',
    slug: 'schema-markup-json-ld',
    excerpt: 'Entenda como usar Schema Markup e JSON-LD para melhorar o SEO do seu blog.',
    content: `<h2>O que é Schema Markup?</h2>
<p>Schema Markup é um código que você adiciona ao seu HTML para ajudar os mecanismos de busca a entender o conteúdo.</p>

<h2>JSON-LD Format</h2>
<p>JSON-LD é o formato recomendado pelo Google para Schema Markup.</p>

<h2>Tipos de Schema Úteis</h2>
<ul>
  <li>BlogPosting - Para artigos de blog</li>
  <li>Organization - Para informações da organização</li>
  <li>BreadcrumbList - Para navegação</li>
</ul>

<h2>Benefícios</h2>
<p>Com Schema Markup correto, seu site pode aparecer com rich snippets nos resultados de busca.</p>`,
    author: 'Seu Nome',
    category: 'SEO',
    tags: ['SEO', 'Schema', 'JSON-LD'],
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    featuredImageAlt: 'Schema Markup',
    metadata: {
      title: 'Schema Markup e JSON-LD',
      description: 'Entenda como usar Schema Markup e JSON-LD para melhorar o SEO do seu blog.',
      keywords: ['SEO', 'Schema', 'JSON-LD', 'markup'],
      robots: 'index, follow',
    },
    publishedAt: new Date('2026-04-18'),
    updatedAt: new Date('2026-04-18'),
    readingTime: 7,
    views: 200,
  },
];

// Create directories if they don't exist
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// Write sample posts
fs.writeFileSync(POSTS_FILE, JSON.stringify(samplePosts, null, 2));

console.log(`✅ Seed data created successfully!`);
console.log(`📝 ${samplePosts.length} sample posts created in ${POSTS_FILE}`);
