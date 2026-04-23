/**
 * Post Content Component - Display full post
 */

'use client';

import { Post } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const [contentHtml, setContentHtml] = useState<string>('');

  useEffect(() => {
    // If content contains HTML, render it. Otherwise, wrap in paragraphs.
    if (post.content.includes('<')) {
      setContentHtml(post.content);
    } else {
      const html = post.content
        .split('\n\n')
        .map((para) => `<p>${para}</p>`)
        .join('');
      setContentHtml(html);
    }
  }, [post.content]);

  return (
    <article className="mx-auto max-w-3xl">
      {/* Header */}
      <header className="mb-8">
        {/* Category */}
        <div className="mb-4">
          <Link href={`/blog/category/${post.category}`}>
            <span className="text-sm font-semibold uppercase text-blue-600 hover:text-blue-800">
              {post.category}
            </span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900">{post.title}</h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 border-b border-gray-200 pb-4">
          <span className="text-sm">Por <strong>{post.author}</strong></span>
          <span className="text-sm">
            {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="text-sm">{post.readingTime} min de leitura</span>
          {post.views !== undefined && (
            <span className="text-sm">{post.views} visualizações</span>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <figure className="mb-8">
          <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {post.featuredImageAlt && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {post.featuredImageAlt}
            </figcaption>
          )}
        </figure>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mb-8 border-t border-b border-gray-200 py-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-block rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SEO Info */}
      {post.metadata && (
        <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Sobre este artigo</h3>
          {post.metadata.keywords && (
            <p className="mb-2 text-sm text-gray-700">
              <strong>Palavras-chave:</strong> {post.metadata.keywords.join(', ')}
            </p>
          )}
          {post.metadata.robots && (
            <p className="text-sm text-gray-700">
              <strong>Indexação:</strong> {post.metadata.robots}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
