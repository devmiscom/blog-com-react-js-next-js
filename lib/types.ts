/**
 * Post and Blog Related Types
 */

export interface PostMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  robots?: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow';
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  metadata: PostMetadata;
  publishedAt: Date;
  updatedAt: Date;
  readingTime: number;
  views?: number;
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  metadata: PostMetadata;
}

export interface PostListItem extends Omit<Post, 'content'> {}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  showInNavigation: boolean;
  publishedAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface CreateTagInput {
  name: string;
}

export interface CreatePageInput {
  title: string;
  description: string;
  content: string;
  showInNavigation?: boolean;
}

export interface SEOAnalysis {
  title: {
    length: number;
    optimal: boolean;
    score: number;
  };
  description: {
    length: number;
    optimal: boolean;
    score: number;
  };
  keywords: {
    count: number;
    density: number;
    score: number;
  };
  headings: {
    h1Count: number;
    optimal: boolean;
    score: number;
  };
  readability: {
    score: number;
    level: 'Easy' | 'Medium' | 'Hard';
  };
  overallScore: number;
}
