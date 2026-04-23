import { Metadata } from 'next';
import { generateSeoMetadata } from '@/lib/seoMetaTags';
import AdminDashboard from './AdminDashboard';

export const metadata: Metadata = generateSeoMetadata({
  title: 'Admin',
  description: 'Painel administrativo para gerenciar posts, categorias, tags e páginas.',
  url: '/admin',
  keywords: ['admin', 'cms', 'posts', 'categorias', 'tags', 'paginas'],
  type: 'website',
});

export default function AdminPage() {
  return <AdminDashboard />;
}
