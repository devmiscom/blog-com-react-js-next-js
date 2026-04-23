# ⚙️ Checklist de Configuração Pós-Deploy

Use este checklist para configurar seu blog após o deploy no Vercel.

---

## 📋 Pré-Deploy (Antes de fazer deploy)

- [ ] Personalizei `lib/seoConfig.ts` com meus dados
- [ ] Preparei imagens para posts (logo, og-image)
- [ ] Criei pelo menos 1 post de teste com `npm run build` bem-sucedido
- [ ] Testei localmente com `npm run dev`
- [ ] Fiz commit no Git

---

## 🌐 Deploy no Vercel

- [ ] Criei conta no Vercel (vercel.com)
- [ ] Conectei meu repositório GitHub ao Vercel
- [ ] Vercel fez o deploy automaticamente
- [ ] Acessei a URL gerada (seu-projeto.vercel.app)
- [ ] Confirmei que o site está funcionando

---

## 🔧 Configurar Variáveis de Ambiente

No painel Vercel:
1. Vá para **Settings** > **Environment Variables**
2. Adicione cada variável abaixo

### Obrigatórias

- [ ] `NEXT_PUBLIC_SITE_URL`
  - Valor: `https://seu-dominio.com` (ou `https://seu-projeto.vercel.app`)

### Google

- [ ] `GOOGLE_SITE_VERIFICATION`
  - Obtenha em: https://search.google.com/search-console
  - Procure por "Site Verification" na Settings

- [ ] `GOOGLE_SEARCH_CONSOLE_ID` (opcional)
  - Seu ID do Google Search Console

### Bing

- [ ] `BING_WEBMASTER_ID` (opcional)
  - Obtenha em: https://www.bing.com/webmasters

### Yandex

- [ ] `YANDEX_VERIFICATION` (opcional)
  - Obtenha em: https://webmaster.yandex.com

### Facebook

- [ ] `FACEBOOK_DOMAIN_VERIFICATION` (opcional)
  - Obtenha em: https://developers.facebook.com

---

## 🔑 Configurar Domínio Personalizado

### Opção 1: Usar Vercel Domains (Pago)

- [ ] Em **Settings** > **Domains**
- [ ] Clique "Add"
- [ ] Siga o processo de compra

### Opção 2: Usar seu Registrador

1. [ ] Em **Settings** > **Domains**, clique "Add"
2. [ ] Digite seu domínio
3. [ ] Copie os DNS records mostrados
4. [ ] No seu registrador (Hostinger, GoDaddy, etc):
   - [ ] Acesse suas configurações de DNS
   - [ ] Adicione os registros CNAME e A
5. [ ] Espere 24-48 horas pela propagação

---

## 🔍 Configurar Search Engines

### Google Search Console

1. [ ] Acesse: https://search.google.com/search-console
2. [ ] Clique "Add Property"
3. [ ] Digite sua URL
4. [ ] Escolha método de verificação:
   - [ ] Upload de arquivo HTML, OU
   - [ ] Meta tag, OU
   - [ ] DNS record (recomendado)
5. [ ] Adicione o sitemap: `https://seu-dominio.com/sitemap.xml`
6. [ ] Monitore o progresso de indexação

### Bing Webmaster Tools

1. [ ] Acesse: https://www.bing.com/webmasters
2. [ ] Clique "Add a site"
3. [ ] Digite sua URL
4. [ ] Verifique usando:
   - [ ] Google Search Console, OU
   - [ ] Meta tag
5. [ ] Adicione o sitemap

### Yandex Webmaster

1. [ ] Acesse: https://webmaster.yandex.com
2. [ ] Adicione seu site
3. [ ] Escolha método de verificação
4. [ ] Adicione o sitemap

---

## 📱 Mobile & Performance

- [ ] Testei no navegador mobile (responsivo)
- [ ] Verifiquei Google PageSpeed Insights: https://pagespeed.web.dev
- [ ] Score mobile >= 80
- [ ] Score desktop >= 90

### Melhorias se score baixo:

- [ ] Comprimir imagens
- [ ] Usar WebP format
- [ ] Ativar cache no Vercel
- [ ] Minimizar JavaScript

---

## 📊 Configurar Analytics (Opcional)

### Google Analytics

1. [ ] Criei conta em: https://analytics.google.com
2. [ ] Adicionei tracking ID: `G-XXXXXXX`
3. [ ] Implementei no `app/layout.tsx` (futuro)
4. [ ] Testei se está registrando eventos

### Alternativa: Plausible

1. [ ] Criei conta em: https://plausible.io
2. [ ] Adicionei domínio
3. [ ] Implementei script no `app/layout.tsx`
4. [ ] Testei com incógnita/modo privado

---

## 📝 Criar Primeiro Post em Produção

### Método 1: Via API

```bash
curl -X POST https://seu-dominio.com/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bem-vindo ao meu blog",
    "excerpt": "Primeiro post do blog",
    "content": "<h2>Olá!</h2><p>Este é meu primeiro post...</p>",
    "author": "Seu Nome",
    "category": "Notícias",
    "tags": ["bem-vindo", "primeiro-post"],
    "featuredImage": "https://images.unsplash.com/...",
    "featuredImageAlt": "Banner",
    "metadata": {
      "title": "Bem-vindo ao meu blog",
      "description": "O primeiro post do meu blog",
      "keywords": ["blog", "bem-vindo"],
      "robots": "index, follow"
    }
  }'
```

### Método 2: Admin Dashboard (futuro)

- [ ] Acessar `/admin` (quando implementado)
- [ ] Criar post via interface

### Confirmação

- [ ] [ ] Post aparece em `https://seu-dominio.com/blog`
- [ ] [ ] Post aparece com slug correto
- [ ] [ ] Meta tags estão corretas (verificar source)
- [ ] [ ] JSON-LD schema está lá (DevTools > JSON-LD)

---

## 🔗 Criar Links para o Blog

- [ ] Adicionar link no seu site principal
- [ ] Adicionar menu de navegação
- [ ] Adicionar link em email/social media
- [ ] Adicionar no Google Search Console

---

## 📧 Configurar Email (Opcional)

Para receber notificações:

- [ ] Adicionar email de contato em `lib/seoConfig.ts`
- [ ] Configurar email de notificações no Vercel (Settings > Email)
- [ ] Testar recepção de email

---

## 🔐 Segurança

- [ ] Verificar que `.env.local` está no `.gitignore`
- [ ] Não fazer commit de secrets
- [ ] Configurar CORS se necessário
- [ ] Ativar 2FA no GitHub e Vercel
- [ ] Revisar permissões do Vercel

---

## 📈 Monitoramento Pós-Deploy

### Logs do Vercel

- [ ] Acessar Vercel > Project > Deployments
- [ ] Verificar logs de build
- [ ] Verificar logs de runtime
- [ ] Configurar alerts para erros

### Analytics

- [ ] Google Search Console: indexação
- [ ] Google Analytics: tráfego
- [ ] Vercel Analytics: performance (se Premium)

---

## 🚀 Otimizações Avançadas

- [ ] Ativar ISR (Incremental Static Regeneration)
- [ ] Configurar caching de imagens
- [ ] Otimizar Core Web Vitals
- [ ] Implementar PWA (Progressive Web App)
- [ ] Adicionar Schema.org adicional (se necessário)

---

## 📚 Backups

- [ ] Fazer backup de `content/posts/posts.json` regularmente
- [ ] Git commit automático de posts
- [ ] Backup em cloud (AWS S3, Google Cloud Storage)
- [ ] Documentar processo de recuperação

---

## 🎨 Personalizações

Arquivos a personalizar:

- [ ] `lib/seoConfig.ts` - Configurações do blog
- [ ] `app/layout.tsx` - Header/Footer globais (se necessário)
- [ ] `globals.css` - Estilos customizados
- [ ] `public/` - Logos, favicon, imagens

---

## 📞 Próximos Passos

Após completar este checklist:

1. [ ] Blog está acessível e indexado
2. [ ] Posts estão sendo criados
3. [ ] Analytics está funcionando
4. [ ] Performance está boa
5. [ ] Domínio está configurado

**Próximo**: Adicionar mais funcionalidades (admin, editor, etc)

---

## ✅ Dúvidas Frequentes

### "Site não aparece no Google"
- Espere 1-2 semanas após adicionar o sitemap
- Verificar Google Search Console para erros
- Usar "Request Indexing" no GSC

### "Posts não aparecem"
- Verificar `content/posts/posts.json` existe
- Conferir se Posts foram criados
- Fazer rebuild no Vercel

### "Imagens quebradas"
- Usar URLs absolutas (com https://)
- Verificar CORS se imagens são de outro domínio
- Usar next/image component

### "Performance baixa"
- Comprimir imagens
- Usar WebP format
- Ativar cache no Vercel
- Verificar Google PageSpeed

---

## 📋 Checklist Final

- [ ] Domínio está funcionando
- [ ] Posts estão criados
- [ ] Blog está indexado no Google
- [ ] Performance está boa
- [ ] Analytics está ativo
- [ ] Backups estão feitos
- [ ] Segurança está configurada
- [ ] Pronto para monetizar (futuro)

---

**Parabéns! Seu blog está no ar! 🎉**

Próximo arquivo para ler: [PROJETO_COMPLETO.md](./PROJETO_COMPLETO.md)
