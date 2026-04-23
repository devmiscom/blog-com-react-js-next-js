# 🚀 Blog Portal com Next.js + SEO Avançado

Um blog moderno, otimizado para SEO, similar ao WordPress, desenvolvido com **Next.js 14+**, **React 18+** e **TypeScript**.

## ✨ Funcionalidades

### 🔍 SEO Avançado (Tipo Yoast SEO)
- ✅ **Meta tags dinâmicas** por página/post (título, descrição, keywords)
- ✅ **JSON-LD Schema** (BlogPosting, Organization, BreadcrumbList)
- ✅ **Open Graph e Twitter Cards** configurados automaticamente
- ✅ **Sitemap.xml** dinâmico para todos os posts
- ✅ **robots.txt** otimizado para crawlers
- ✅ **Analisador de SEO** integrado (readability, keyword density, title/description length)
- ✅ **Canonical URLs** automáticos em todos os posts
- ✅ **Verificações de site** (Google, Bing, Yandex, Facebook)

### 📝 Sistema de Blog (Tipo WordPress)
- ✅ **CRUD de Posts** via API REST
- ✅ **Listagem de posts** com paginação
- ✅ **Posts por categoria** e **tags**
- ✅ **Busca de posts**
- ✅ **Contador de visualizações**
- ✅ **Tempo de leitura** automático
- ✅ **SSG (Static Site Generation)** para melhor performance e SEO
- ✅ **ISR (Incremental Static Regeneration)** para revalidação de cache

### 🎨 Frontend
- ✅ **Design responsivo** (mobile-first)
- ✅ **Tailwind CSS** para styling
- ✅ **Componentes reutilizáveis**
- ✅ **Imagens otimizadas** com next/image
- ✅ **Fonte otimizada** com next/font

### ⚙️ Configurações Globais
- ✅ **Configuração centralizada de SEO** (`lib/seoConfig.ts`)
- ✅ **Admin dashboard** para criar/editar posts (em desenvolvimento)
- ✅ **Preview de SEO** antes de publicar

## 📦 Estrutura do Projeto

```
blog-com-react-js-next-js/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout (SEO meta tags)
│   ├── components/
│   │   ├── PostCard.tsx            # Card de post
│   │   └── PostContent.tsx         # Conteúdo do post
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts            # GET/POST /api/posts
│   │       └── [id]/route.ts       # GET/PUT/DELETE /api/posts/[id]
│   ├── blog/
│   │   ├── page.tsx                # Listagem de posts
│   │   └── [slug]/page.tsx         # Post individual (SSG)
│   ├── admin/                      # Dashboard de admin (futuro)
│   ├── sitemap.xml/route.ts        # Sitemap dinâmico
│   └── robots.txt/route.ts         # Robots.txt
├── lib/
│   ├── seoConfig.ts                # Configurações globais de SEO
│   ├── seoMetaTags.ts              # Gerador de meta tags
│   ├── seoAnalyzer.ts              # Analisador de SEO (Yoast-like)
│   ├── posts.ts                    # CRUD e busca de posts
│   └── types.ts                    # TypeScript interfaces
├── content/
│   └── posts/
│       └── posts.json              # Database de posts (JSON)
├── scripts/
│   └── seed.js                     # Script para criar posts de exemplo
└── public/
    └── posts/                      # Imagens de posts
```

## 🚀 Quick Start

### 1. Instalação

```bash
# Clonar repositório
git clone <seu-repositorio>
cd blog-com-react-js-next-js

# Instalar dependências
npm install
```

### 2. Criar dados de exemplo

```bash
# Executar seed script
node scripts/seed.js
```

Isso criará 3 posts de exemplo em `content/posts/posts.json`.

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google
GOOGLE_SITE_VERIFICATION=seu-token-aqui
GOOGLE_SEARCH_CONSOLE_ID=seu-id-aqui

# Bing
BING_WEBMASTER_ID=seu-id-aqui

# Yandex
YANDEX_VERIFICATION=seu-token-aqui

# Facebook
FACEBOOK_DOMAIN_VERIFICATION=seu-token-aqui
```

### 4. Executar em desenvolvimento

```bash
npm run dev
```

Acesse em: `http://localhost:3000`

## 🌐 Deploy no Vercel

### Opção 1: Manual (recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opção 2: Via GitHub

1. Push seu repositório para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Selecione seu repositório
5. Deploy automático será executado

## 📝 Como Usar

### Criar um novo post

**Via API REST:**

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu novo post",
    "excerpt": "Um resumo do post",
    "content": "<p>Conteúdo completo...</p>",
    "author": "Seu Nome",
    "category": "Tecnologia",
    "tags": ["Next.js", "SEO"],
    "featuredImage": "https://exemplo.com/imagem.jpg",
    "featuredImageAlt": "Descrição da imagem",
    "metadata": {
      "title": "Meu novo post",
      "description": "Descrição para SEO",
      "keywords": ["Next.js", "SEO"],
      "robots": "index, follow"
    }
  }'
```

**Respostas:**
- ✅ Sucesso: `200 + JSON do post criado`
- ❌ Erro: `400/500 + mensagem de erro`

### Listar posts

```bash
# Todos os posts
curl http://localhost:3000/api/posts

# Filtrar por categoria
curl http://localhost:3000/api/posts?category=Tecnologia

# Filtrar por tag
curl http://localhost:3000/api/posts?tag=Next.js

# Buscar
curl http://localhost:3000/api/posts?search=SEO
```

### Obter post por ID

```bash
curl http://localhost:3000/api/posts/1
```

### Atualizar post

```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Novo título", ...}'
```

### Deletar post

```bash
curl -X DELETE http://localhost:3000/api/posts/1
```

## 🔧 Configurar SEO

Edite `lib/seoConfig.ts` para personalizar:

```typescript
export const seoConfig = {
  siteName: 'Seu Blog',
  siteDescription: 'Descrição do seu blog',
  siteUrl: 'https://seu-dominio.com',
  author: 'Seu Nome',
  email: 'seu-email@exemplo.com',
  // ... mais configurações
};
```

## 📊 Analisador de SEO (Tipo Yoast)

O sistema analisa:
- ✅ Comprimento do título (ideal: 30-60 caracteres)
- ✅ Comprimento da meta description (ideal: 120-160 caracteres)
- ✅ Densidade de palavras-chave (ideal: 0.5-2.5%)
- ✅ Estrutura de headings (H1 único)
- ✅ Legibilidade do conteúdo (Flesch Reading Ease)
- ✅ Score geral (0-100)

Recomendações são fornecidas automaticamente para cada post.

## 📱 Otimizações de Performance

- ✅ **SSG** para páginas estáticas
- ✅ **ISR** para revalidação automática
- ✅ **Image Optimization** com next/image
- ✅ **Font Optimization** com next/font
- ✅ **Lazy Loading** de imagens
- ✅ **Minification** de CSS/JS
- ✅ **Code Splitting** automático

## 🧪 Build e Teste

```bash
# Build para produção
npm run build

# Executar build localmente
npm run start

# Verificar performance
npm run build && npm run start
```

## 📋 Checklist de SEO

- ✅ Meta tags dinâmicas
- ✅ JSON-LD schema
- ✅ Open Graph tags
- ✅ Twitter cards
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Breadcrumbs
- ✅ Mobile-friendly
- ✅ Page speed otimizado
- ✅ Heading structure correto
- ✅ Alt text em imagens
- ✅ Internal linking
- ✅ Keywords otimizadas

## 🚀 Próximas Features

- [ ] Admin Dashboard completo (criar, editar, deletar posts)
- [ ] Editor WYSIWYG para posts
- [ ] Suporte a Markdown
- [ ] Comentários em posts
- [ ] Sistema de categorias dinâmicas
- [ ] Recomendações de posts relacionados
- [ ] Analytics integrado (Google Analytics, Plausible)
- [ ] Search integrada no frontend
- [ ] Dark mode
- [ ] Multilingual support
- [ ] Database (MongoDB, PostgreSQL)

## 📚 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Search Central](https://search.google.com/search-console)
- [Schema.org](https://schema.org)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 📄 Licença

MIT

## 💬 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Next.js + React + TypeScript**
