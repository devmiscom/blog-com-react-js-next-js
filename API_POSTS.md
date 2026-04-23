# 📝 Guia de API para Criar e Gerenciar Posts

## 🚀 Introdução

Este blog possui uma API REST completa para gerenciar posts programaticamente. Você pode criar, ler, atualizar e deletar posts via HTTP requests.

---

## 🔌 Endpoints da API

### Base URL
```
http://localhost:3000/api  (local)
https://seu-blog.vercel.app/api  (produção)
```

---

## 📚 Criar Post (POST)

### Endpoint
```
POST /api/posts
```

### Headers
```
Content-Type: application/json
```

### Body (JSON)

```json
{
  "title": "Título do Post",
  "excerpt": "Um resumo do post em 1-2 frases",
  "content": "<h2>Título da seção</h2><p>Conteúdo do post...</p>",
  "author": "Seu Nome",
  "category": "Tecnologia",
  "tags": ["Next.js", "SEO", "React"],
  "featuredImage": "https://exemplo.com/imagem.jpg",
  "featuredImageAlt": "Descrição da imagem para acessibilidade",
  "metadata": {
    "title": "Título otimizado para SEO",
    "description": "Descrição para meta tags (máximo 160 caracteres)",
    "keywords": ["palavra-chave-1", "palavra-chave-2", "palavra-chave-3"],
    "robots": "index, follow"
  }
}
```

### Exemplo cURL

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Começando com Next.js",
    "excerpt": "Um guia para iniciantes em Next.js",
    "content": "<h2>Introdução</h2><p>Next.js é um framework React...</p>",
    "author": "João Silva",
    "category": "Tutoriais",
    "tags": ["Next.js", "React", "JavaScript"],
    "featuredImage": "https://images.unsplash.com/photo-1633356122544-f134324ef6df?w=800",
    "featuredImageAlt": "Next.js Logo",
    "metadata": {
      "title": "Começando com Next.js - Guia Completo",
      "description": "Um guia passo a passo para iniciantes em Next.js",
      "keywords": ["Next.js", "React", "Framework"],
      "robots": "index, follow"
    }
  }'
```

### Resposta de Sucesso (201)

```json
{
  "success": true,
  "data": {
    "id": "1713900000000",
    "title": "Começando com Next.js",
    "slug": "comecando-com-nextjs",
    "excerpt": "Um guia para iniciantes em Next.js",
    "author": "João Silva",
    "category": "Tutoriais",
    "tags": ["Next.js", "React", "JavaScript"],
    "featuredImage": "https://images.unsplash.com/photo-1633356122544-f134324ef6df?w=800",
    "featuredImageAlt": "Next.js Logo",
    "metadata": {...},
    "publishedAt": "2026-04-23T17:00:00Z",
    "updatedAt": "2026-04-23T17:00:00Z",
    "readingTime": 8,
    "views": 0
  }
}
```

### Resposta de Erro (400)

```json
{
  "success": false,
  "error": "Missing required fields"
}
```

---

## 📖 Listar Posts (GET)

### Endpoint
```
GET /api/posts
```

### Parâmetros de Query (opcionais)

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| `category` | Filtrar por categoria | `?category=Tecnologia` |
| `tag` | Filtrar por tag | `?tag=Next.js` |
| `search` | Buscar por texto | `?search=SEO` |

### Exemplos

```bash
# Listar todos os posts
curl http://localhost:3000/api/posts

# Filtrar por categoria
curl http://localhost:3000/api/posts?category=Tecnologia

# Filtrar por tag
curl http://localhost:3000/api/posts?tag=Next.js

# Combinar filtros
curl http://localhost:3000/api/posts?category=Tecnologia&tag=React

# Buscar
curl http://localhost:3000/api/posts?search=performance
```

### Resposta

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Como começar com Next.js SEO",
      "slug": "como-comecar-com-nextjs-seo",
      "excerpt": "Um guia completo...",
      "author": "Seu Nome",
      "category": "Tecnologia",
      "tags": ["Next.js", "SEO"],
      "featuredImage": "https://...",
      "featuredImageAlt": "...",
      "metadata": {...},
      "publishedAt": "2026-04-20T00:00:00Z",
      "updatedAt": "2026-04-20T00:00:00Z",
      "readingTime": 8,
      "views": 150
    },
    // mais posts...
  ],
  "count": 3
}
```

---

## 🔍 Obter Post por ID (GET)

### Endpoint
```
GET /api/posts/[id]
```

### Exemplo

```bash
curl http://localhost:3000/api/posts/1
```

### Resposta (200)

```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Como começar com Next.js SEO",
    "slug": "como-comecar-com-nextjs-seo",
    "content": "<h2>Introdução</h2><p>...",
    "excerpt": "Um guia completo...",
    "author": "Seu Nome",
    "category": "Tecnologia",
    "tags": ["Next.js", "SEO"],
    "featuredImage": "https://...",
    "featuredImageAlt": "...",
    "metadata": {...},
    "publishedAt": "2026-04-20T00:00:00Z",
    "updatedAt": "2026-04-20T00:00:00Z",
    "readingTime": 8,
    "views": 150
  }
}
```

### Resposta de Erro (404)

```json
{
  "success": false,
  "error": "Post not found"
}
```

---

## ✏️ Atualizar Post (PUT)

### Endpoint
```
PUT /api/posts/[id]
```

### Body (JSON) - Campos opcionais

```json
{
  "title": "Novo título",
  "excerpt": "Novo resumo",
  "content": "<h2>Novo conteúdo</h2>",
  "author": "Novo autor",
  "category": "Nova categoria",
  "tags": ["nova-tag"],
  "featuredImage": "https://...",
  "featuredImageAlt": "Novo alt",
  "metadata": {
    "title": "Novo título SEO",
    "description": "Nova descrição"
  }
}
```

### Exemplo

```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Novo Título Atualizado",
    "views": 200
  }'
```

### Resposta (200)

```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Novo Título Atualizado",
    "slug": "novo-titulo-atualizado",
    "updatedAt": "2026-04-23T17:30:00Z",
    // ...resto dos dados
  }
}
```

---

## 🗑️ Deletar Post (DELETE)

### Endpoint
```
DELETE /api/posts/[id]
```

### Exemplo

```bash
curl -X DELETE http://localhost:3000/api/posts/1
```

### Resposta (200)

```json
{
  "success": true,
  "message": "Post deleted"
}
```

### Resposta de Erro (404)

```json
{
  "success": false,
  "error": "Post not found"
}
```

---

## 🛠️ Exemplos Prácticos

### JavaScript / Node.js

```javascript
// Criar post
async function criarPost() {
  const response = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Meu novo post',
      excerpt: 'Um resumo',
      content: '<p>Conteúdo do post...</p>',
      author: 'Seu Nome',
      category: 'Tecnologia',
      tags: ['JavaScript', 'Web'],
      featuredImage: 'https://...',
      featuredImageAlt: 'Descrição',
      metadata: {
        title: 'Título SEO',
        description: 'Descrição do post',
        keywords: ['js', 'web'],
        robots: 'index, follow'
      }
    })
  });

  const data = await response.json();
  console.log(data);
}

// Obter todos os posts
async function obterPosts() {
  const response = await fetch('http://localhost:3000/api/posts');
  const data = await response.json();
  console.log(data.data);
}

// Atualizar post
async function atualizarPost(id) {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Novo título'
    })
  });

  const data = await response.json();
  console.log(data);
}

// Deletar post
async function deletarPost(id) {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'DELETE'
  });

  const data = await response.json();
  console.log(data);
}
```

### Python

```python
import requests
import json

BASE_URL = 'http://localhost:3000/api'

# Criar post
def criar_post():
    data = {
        'title': 'Meu novo post',
        'excerpt': 'Um resumo',
        'content': '<p>Conteúdo...</p>',
        'author': 'Seu Nome',
        'category': 'Tecnologia',
        'tags': ['Python', 'API'],
        'featuredImage': 'https://...',
        'featuredImageAlt': 'Descrição',
        'metadata': {
            'title': 'Título SEO',
            'description': 'Descrição',
            'keywords': ['python', 'api'],
            'robots': 'index, follow'
        }
    }
    
    response = requests.post(f'{BASE_URL}/posts', json=data)
    print(response.json())

# Obter posts
def obter_posts():
    response = requests.get(f'{BASE_URL}/posts')
    posts = response.json()
    for post in posts['data']:
        print(f"- {post['title']}")

# Atualizar post
def atualizar_post(id):
    data = {'title': 'Novo título'}
    response = requests.put(f'{BASE_URL}/posts/{id}', json=data)
    print(response.json())

# Deletar post
def deletar_post(id):
    response = requests.delete(f'{BASE_URL}/posts/{id}')
    print(response.json())
```

---

## 📋 Campos do Post

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `title` | string | ✅ | Título do post |
| `excerpt` | string | ✅ | Resumo/descrição breve |
| `content` | string | ✅ | Conteúdo do post (HTML) |
| `author` | string | ✅ | Nome do autor |
| `category` | string | ✅ | Categoria do post |
| `tags` | array | ❌ | Array de tags/keywords |
| `featuredImage` | string | ❌ | URL da imagem destaque |
| `featuredImageAlt` | string | ❌ | Alt text da imagem |
| `metadata` | object | ✅ | Objeto com configurações SEO |
| `metadata.title` | string | ✅ | Título para meta tags |
| `metadata.description` | string | ✅ | Description meta tag |
| `metadata.keywords` | array | ❌ | Keywords para SEO |
| `metadata.robots` | string | ❌ | Robots meta tag |

---

## ⚠️ Validação e Limites

- **Título**: Obrigatório, máximo 200 caracteres
- **Excerpt**: Obrigatório, máximo 500 caracteres
- **Content**: Obrigatório, suporta HTML
- **Author**: Obrigatório, máximo 100 caracteres
- **Category**: Obrigatório
- **Tags**: Máximo 10 tags
- **Meta Description**: Ideal 120-160 caracteres
- **Meta Title**: Ideal 30-60 caracteres

---

## 🔄 Fluxo de Trabalho Recomendado

1. **Criar Post**
   ```
   POST /api/posts → ID do novo post
   ```

2. **Verificar Post**
   ```
   GET /api/posts/{id} → Confirmar dados
   ```

3. **Atualizar se necessário**
   ```
   PUT /api/posts/{id} → Alterações
   ```

4. **Publicar** (banco de dados salva automaticamente)
   ```
   Acessar http://seu-blog.com/blog/{slug}
   ```

---

## 🚀 Próximas Features

- [ ] Autenticação com JWT
- [ ] Upload de imagens
- [ ] Editor WYSIWYG
- [ ] Agendamento de posts
- [ ] Soft delete de posts
- [ ] Versionamento de posts

---

**Documentação completa criada! 📚**
