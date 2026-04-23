/**
 * Posts Management - Storage and Retrieval
 * Using JSON file storage (can be replaced with database later)
 */

import { Post, CreatePostInput, PostListItem } from './types';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import slugify from 'slugify';

const postsDir = join(process.cwd(), 'content', 'posts');
const postsFile = join(postsDir, 'posts.json');

// Ensure posts directory and file exist
function ensurePostsFile() {
  if (!existsSync(postsDir)) {
    // Directory will be created by the system if needed
  }
  if (!existsSync(postsFile)) {
    writeFileSync(postsFile, JSON.stringify([], null, 2));
  }
}

// Calculate reading time (estimated 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

// Get all posts
export function getAllPosts(): PostListItem[] {
  try {
    ensurePostsFile();
    const data = readFileSync(postsFile, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    
    // Sort by publishedAt descending and return without content
    return posts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map(({ content, ...rest }) => rest as PostListItem);
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

// Get post by slug
export function getPostBySlug(slug: string): Post | null {
  try {
    ensurePostsFile();
    const data = readFileSync(postsFile, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    return posts.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

// Get post by ID
export function getPostById(id: string): Post | null {
  try {
    ensurePostsFile();
    const data = readFileSync(postsFile, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    return posts.find((post) => post.id === id) || null;
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

// Get all slugs (for static generation)
export function getAllPostSlugs(): string[] {
  try {
    ensurePostsFile();
    const data = readFileSync(postsFile, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
}

// Get posts by category
export function getPostsByCategory(category: string): PostListItem[] {
  try {
    ensurePostsFile();
    const data = readFileSync(postsFile, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    
    return posts
      .filter((post) => post.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map(({ content, ...rest }) => rest as PostListItem);
  } catch (error) {
    console.error('Error reading posts by category:', error);
    return [];
  }
}

// Get posts by tag
export function getPostsByTag(tag: string): PostListItem[] {
  try {
    ensurePostsFile();
    const data = readFileSync(postsFile, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    
    return posts
      .filter((post) => post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map(({ content, ...rest }) => rest as PostListItem);
  } catch (error) {
    console.error('Error reading posts by tag:', error);
    return [];
  }
}

// Create new post
export function createPost(input: CreatePostInput): Post {
  ensurePostsFile();
  
  const slug = slugify(input.title, { lower: true, strict: true });
  const id = Date.now().toString();
  const now = new Date();
  
  const post: Post = {
    id,
    slug,
    content: input.content,
    excerpt: input.excerpt,
    author: input.author,
    category: input.category,
    tags: input.tags,
    featuredImage: input.featuredImage,
    featuredImageAlt: input.featuredImageAlt,
    metadata: input.metadata,
    publishedAt: now,
    updatedAt: now,
    readingTime: calculateReadingTime(input.content),
    views: 0,
    title: input.title,
  };
  
  const data = readFileSync(postsFile, 'utf-8');
  const posts = JSON.parse(data) as Post[];
  posts.push(post);
  writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  
  return post;
}

// Update post
export function updatePost(id: string, input: Partial<CreatePostInput>): Post | null {
  ensurePostsFile();
  const data = readFileSync(postsFile, 'utf-8');
  const posts = JSON.parse(data) as Post[];
  
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex === -1) return null;
  
  const post = posts[postIndex];
  const updatedPost: Post = {
    ...post,
    ...input,
    id: post.id,
    slug: input.title ? slugify(input.title, { lower: true, strict: true }) : post.slug,
    publishedAt: post.publishedAt,
    updatedAt: new Date(),
    readingTime: input.content ? calculateReadingTime(input.content) : post.readingTime,
  };
  
  posts[postIndex] = updatedPost;
  writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  
  return updatedPost;
}

// Delete post
export function deletePost(id: string): boolean {
  ensurePostsFile();
  const data = readFileSync(postsFile, 'utf-8');
  const posts = JSON.parse(data) as Post[];
  
  const filteredPosts = posts.filter((p) => p.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  writeFileSync(postsFile, JSON.stringify(filteredPosts, null, 2));
  return true;
}

// Increment post views
export function incrementPostViews(slug: string): void {
  ensurePostsFile();
  const data = readFileSync(postsFile, 'utf-8');
  const posts = JSON.parse(data) as Post[];
  
  const post = posts.find((p) => p.slug === slug);
  if (post) {
    post.views = (post.views || 0) + 1;
    writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  }
}

// Get posts by search query
export function searchPosts(query: string): PostListItem[] {
  try {
    ensurePostsFile();
    const data = readFileSync(postsFile, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    const lowerQuery = query.toLowerCase();
    
    return posts
      .filter((post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      )
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map(({ content, ...rest }) => rest as PostListItem);
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}
