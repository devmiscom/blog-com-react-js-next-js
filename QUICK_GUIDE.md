# 🚀 Quick Start Guide - 5 Minutos

## ⚡ Comece em 5 Minutos

### 1️⃣ Terminal - Execute estes 3 comandos:

```bash
npm install
node scripts/seed.js
npm run dev
```

### 2️⃣ Navegador - Acesse:

```
http://localhost:3000/blog
```

### ✅ Pronto! Seu blog está rodando!

---

## 🔧 Personalizar Nome (1 minuto)

**Arquivo:** `lib/seoConfig.ts`

```typescript
export const seoConfig = {
  siteName: 'Meu Blog',              // ← Mude para seu nome
  siteDescription: 'Minha descrição', // ← Sua descrição
  siteUrl: 'https://meu-dominio.com', // ← Seu domínio
  author: 'Seu Nome',
  email: 'seu-email@email.com',
  // ... resto do config
};
```

**Salve!** Tudo muda automaticamente. ✨

---

## 📝 Criar Seu Primeiro Post

### Via API (Recomendado):

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Primeiro Post",
    "excerpt": "Um resumo bem interessante",
    "content": "<h2>Conteúdo</h2><p>Texto aqui...</p>",
    "author": "Seu Nome",
    "category": "Tecnologia",
    "tags": ["react", "nextjs"],
    "featuredImage": "https://exemplo.com/imagem.jpg",
    "metadata": {
      "title": "Título para SEO",
      "description": "Descrição para SEO",
      "keywords": ["palavras-chave"]
    }
  }'
```

Seu post aparece em: `http://localhost:3000/blog/meu-primeiro-post`

---

## 🌐 Fazer Deploy em 2 Minutos

### Opção 1: Deploy Automático ⭐ (Recomendado)

```bash
# 1. Faça push para GitHub
git add .
git commit -m "Meu blog pronto"
git push origin main

# 2. Abra vercel.com/new
# 3. Conecte seu repo
# 4. Deploy automático! ✅
```

**Seu blog em:** `https://seu-projeto.vercel.app`

### Opção 2: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## 📚 Documentação

| Arquivo | Para Quem? | Tempo |
|---------|-----------|-------|
| **PT_BR_LEIA_PRIMEIRO.md** | Iniciantes em português | 10 min |
| **START_HERE.md** | Quick reference | 5 min |
| **README_BLOG.md** | Tudo em detalhes | 20 min |
| **API_POSTS.md** | Usar a API | 15 min |
| **DEPLOY_VERCEL.md** | Fazer deploy | 15 min |

---

## 🆘 Problemas Comuns

### ❌ `npm install` não funciona
```bash
# Solução
npm cache clean --force
npm install
```

### ❌ Porta 3000 já está em uso
```bash
# Use outra porta
npm run dev -- -p 3001
# Acesse em: http://localhost:3001
```

### ❌ Erro ao criar post
Verifique se o JSON é válido. Teste em: https://jsonlint.com/

### ❌ Imagem não carrega
Use URL absoluta, ex: `https://exemplo.com/imagem.jpg`

---

## 📊 Estrutura de Pastas

```
blog-com-react-js-next-js/
├── app/                        ← Páginas e componentes
│   ├── page.tsx               ← Home
│   ├── blog/                  ← Blog
│   │   └── [slug]/page.tsx    ← Post individual
│   └── api/posts/             ← API
├── lib/
│   ├── seoConfig.ts           ← ⭐ Personalize aqui
│   ├── posts.ts               ← CRUD de posts
│   └── seoMetaTags.ts         ← Meta tags
├── content/posts/
│   └── posts.json             ← Seus posts
└── scripts/
    └── seed.js                ← Criar dados teste
```

---

## 💾 Comandos Principais

```bash
npm install              # Instalar
npm run dev             # Desenvolvimento
npm run build           # Build produção
npm run start           # Rodar produção
node scripts/seed.js    # Criar dados teste
```

---

## ✨ Features Inclusos

- ✅ Blog tipo WordPress
- ✅ SEO tipo Yoast (avançado)
- ✅ Sitemap + robots.txt
- ✅ API REST documentada
- ✅ Design responsivo
- ✅ Performance A+
- ✅ SSG + ISR
- ✅ JSON-LD Schema
- ✅ 3 posts de exemplo

---

## 🎯 Próximos Passos

1. ✅ Personalizar `lib/seoConfig.ts`
2. ✅ Criar seus primeiros posts
3. ✅ Deploy no Vercel
4. ✅ Configurar domínio
5. ✅ Google Search Console
6. ✅ Criar conteúdo relevante
7. ✅ Promover nas redes

---

## 📞 Mais Info

- **Documentação:** `PT_BR_LEIA_PRIMEIRO.md`
- **API:** `API_POSTS.md`
- **Deploy:** `DEPLOY_VERCEL.md`
- **SEO:** `README_BLOG.md`

---

**Desenvolvido com ❤️ usando Next.js, React e TypeScript**

🚀 Seu blog está pronto para decolar!
