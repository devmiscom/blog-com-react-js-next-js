# 🚀 Deploy no Vercel - Guia Completo

## ✅ Pré-requisitos

- Conta [GitHub](https://github.com) (gratuita)
- Conta [Vercel](https://vercel.com) (gratuita)
- Domínio personalizado (opcional, você pode usar `seu-blog.vercel.app`)

---

## 📝 Método 1: Deploy Automático via GitHub (Recomendado)

### Passo 1: Push para GitHub

```bash
# Inicializar Git (se ainda não feito)
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit: Blog portal com SEO otimizado"

# Adicionar remote (substitua "seu-usuario" e "seu-repo" pelos seus)
git remote add origin https://github.com/seu-usuario/seu-repo.git

# Push para GitHub
git branch -M main
git push -u origin main
```

### Passo 2: Conectar Vercel ao GitHub

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em "Continue with GitHub"
3. Autorize Vercel a acessar sua conta GitHub
4. Selecione o repositório que você criou
5. Vercel detectará automaticamente que é um projeto Next.js
6. Clique em "Deploy"

### Passo 3: Configurar Variáveis de Ambiente

1. Após o deploy inicial, vá para **Settings** do projeto
2. Selecione **Environment Variables**
3. Adicione as seguintes variáveis:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com

# Google
GOOGLE_SITE_VERIFICATION=seu-codigo-aqui
GOOGLE_SEARCH_CONSOLE_ID=seu-id-aqui

# Bing
BING_WEBMASTER_ID=seu-id-aqui

# Yandex
YANDEX_VERIFICATION=seu-codigo-aqui

# Facebook
FACEBOOK_DOMAIN_VERIFICATION=seu-codigo-aqui
```

4. Clique em "Save"
5. Vercel irá fazer um novo deploy automaticamente

---

## 🌐 Método 2: Deploy Manual com Vercel CLI

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Login no Vercel

```bash
vercel login
```

Você será redirecionado para fazer login na web e autorizar a CLI.

### Passo 3: Deploy

```bash
# Fazer deploy
vercel

# Deploy em produção (pula confirmações)
vercel --prod
```

Vercel irá:
- Detectar Next.js automaticamente
- Coletar as variáveis de ambiente
- Fazer o build
- Deploy na nuvem

---

## 🎯 Configurar Domínio Personalizado

### Opção 1: Usar Domínio do Vercel (Gratuito)

Seu site estará automaticamente em: `seu-projeto.vercel.app`

### Opção 2: Usar Domínio Personalizado

#### Via Vercel Domains (pago)

1. Em **Settings** > **Domains**
2. Clique em "Add" 
3. Digite seu domínio
4. Siga as instruções de compra

#### Via Seu Registrador (Hostinger, GoDaddy, etc)

1. Em **Settings** > **Domains**
2. Clique em "Add"
3. Digite seu domínio
4. Copie os DNS records que aparecem
5. No seu registrador, atualize os DNS records para apontar para Vercel
6. Espere 24-48 horas pela propagação (DNS)

**Exemplo de DNS Records para Vercel:**
```
CNAME: www → cname.vercel-dns.com
A: @ → 76.76.19.93
AAAA: @ → 2610:7e8:3::1
```

---

## 📊 Monitorar Deployment

### Logs de Build

```bash
# Ver logs em tempo real
vercel logs

# Ver logs de um deployment específico
vercel logs [deployment-url]
```

### Analytics

No painel Vercel, você pode ver:
- ✅ Duração do build
- ✅ Tamanho final
- ✅ Função usage
- ✅ Bandwidth
- ✅ Performance Metrics

---

## 🔄 Deploy Automático em Push

Vercel automaticamente fará deploy sempre que você fizer push para GitHub!

```bash
# Fazer alteração
echo "Conteúdo novo" > content/novo-post.md

# Commit e push
git add .
git commit -m "Add new blog post"
git push origin main

# Vercel irá detectar e fazer deploy automaticamente
```

---

## 🚨 Troubleshooting

### Build Falha

**Erro: "Failed to build"**

```bash
# Verificar build local
npm run build

# Verificar erros de tipo
npm run type-check

# Verificar lint
npm run lint
```

### Variáveis de Ambiente Não Funcionar

1. Verifique se as variáveis estão em **Settings** > **Environment Variables**
2. Use `NEXT_PUBLIC_` prefix para variáveis acessíveis no frontend
3. Não use `NEXT_PUBLIC_` para variáveis sensíveis (tokens, senhas)

### Sitemap e Robots.txt Não Aparecer

```bash
# Verificar manualmente
curl https://seu-blog.vercel.app/sitemap.xml
curl https://seu-blog.vercel.app/robots.txt
```

---

## 📈 Otimizações Pós-Deploy

### 1. Verificar SEO

- ✅ Google Search Console: [search.google.com/search-console](https://search.google.com/search-console)
- ✅ Bing Webmaster Tools: [www.bing.com/webmasters](https://www.bing.com/webmasters)
- ✅ Yandex Webmaster: [webmaster.yandex.com](https://webmaster.yandex.com)

### 2. Testar Performance

- ✅ Google PageSpeed Insights: [pagespeed.web.dev](https://pagespeed.web.dev)
- ✅ GTmetrix: [gtmetrix.com](https://gtmetrix.com)
- ✅ WebPageTest: [webpagetest.org](https://webpagetest.org)

### 3. Monitorar Analytics

Adicione Google Analytics ou Plausible (veja próximas features):

```typescript
// No futuro em app/layout.tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
```

---

## 💾 Fazer Backup

### Backup de Posts

```bash
# Copiar arquivo de posts
cp content/posts/posts.json backup/posts-$(date +%Y%m%d-%H%M%S).json

# Upload para GitHub
git add backup/
git commit -m "Backup posts"
git push
```

### Backup Automático com GitHub

Todos seus posts estão em `content/posts/posts.json` no Git!

---

## 🔐 Segurança

### Checklist de Segurança

- ✅ Não commit `.env` (use `.env.local`)
- ✅ Não exponha tokens em código
- ✅ Use HTTPS (automático no Vercel)
- ✅ Valide input de usuários
- ✅ Não exponha informações sensíveis

### Exemplo de .env.local (NÃO FAZER COMMIT)

```env
# .env.local - NUNCA FAZER COMMIT DISSO
GOOGLE_SEARCH_CONSOLE_ID=seu-id-secreto
```

---

## 📞 Suporte

- **Documentação Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Comunidade Discord**: [discord.gg/vercel](https://discord.gg/vercel)
- **GitHub Issues**: Abra uma issue neste repositório

---

## ✅ Checklist de Deploy

- [ ] Repositório criado no GitHub
- [ ] Projeto conectado no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Build foi bem-sucedido
- [ ] Site está acessível
- [ ] Domínio personalizado configurado (opcional)
- [ ] Verificações de site adicionadas (Google, Bing, Yandex)
- [ ] Analytics configurado (futuro)
- [ ] Backup automático de posts (GitHub)

---

**Seu blog está pronto para o mundo! 🌍**

Próxima leitura: [README_BLOG.md](./README_BLOG.md)
