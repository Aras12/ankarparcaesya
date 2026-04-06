import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import SiteLayout from '@/components/layout/SiteLayout'
import { getImageUrl } from '@/lib/constants'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('blog')
  return { title: seo?.meta_title || 'Blog', description: seo?.meta_description, alternates: { canonical: seo?.canonical_url } }
}

export default async function BlogPage() {
  const supabase = createServerSupabaseClient()
  const { data: posts } = await supabase.from('blog_posts').select('*').eq('is_published', true).order('created_at', { ascending: false })
  return (
    <SiteLayout>
      <div className="bg-primary-600 py-12"><div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white font-heading font-extrabold text-3xl">Blog</h1>
      </div></div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image src={getImageUrl(post.image_url)} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-2"><Calendar size={12} /> {post.published_at ? new Date(post.published_at).toLocaleDateString('tr-TR') : ''}</div>
                  <h2 className="font-heading font-bold text-base text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">{post.title}</h2>
                  <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (<p className="text-center text-gray-400 py-12">Henüz blog yazısı yok.</p>)}
      </div>
    </SiteLayout>
  )
}
