/**
 * Post Card Component - Display post in list
 */

import Link from 'next/link';
import Image from 'next/image';
import { PostListItem } from '@/lib/types';

interface PostCardProps {
  post: PostListItem;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-2 inline-block">
          <span className="text-xs font-semibold uppercase text-blue-600">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="mb-4 text-gray-600 line-clamp-2">{post.excerpt}</p>

        {/* Meta */}
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <span>{post.author}</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
          </span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {post.readingTime} min de leitura
          </span>
          {post.views !== undefined && (
            <span className="text-xs text-gray-500">{post.views} visualizações</span>
          )}
        </div>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  );
}
