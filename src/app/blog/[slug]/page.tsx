import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import SiteLayout from '@/components/layout/SiteLayout'
import Sidebar from '@/components/layout/Sidebar'
import { getImageUrl } from '@/lib/constants'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('blog_posts').select('*').eq('slug', params.slug).single()
  if (!data) return {}
  return {
    title: data.title,
    description: data.meta_description || data.excerpt,
    alternates: { canonical: `https://ankarparcaesyanakliye.com.tr/blog/${data.slug}` },
    openGraph: { title: data.title, description: data.meta_description || data.excerpt || '', images: data.image_url ? [{ url: getImageUrl(data.image_url) }] : [], type: 'article' },
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: post } = await supabase.from('blog_posts').select('*').eq('slug', params.slug).eq('is_published', true).single()
  if (!post) notFound()

  return (
    <SiteLayout>
      <div className="relative h-56 md:h-72 bg-primary-900">
        <Image src={getImageUrl(post.image_url)} alt={post.title} fill className="object-cover opacity-50" />
        <div className="absolute inset-0 flex items-end"><div className="max-w-7xl mx-auto px-4 w-full pb-8">
          <div className="flex items-center gap-1 text-white/60 text-sm mb-2"><Calendar size={14} /> {post.published_at ? new Date(post.published_at).toLocaleDateString('tr-TR') : ''}</div>
          <h1 className="text-white font-heading font-extrabold text-2xl md:text-4xl">{post.title}</h1>
        </div></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="content-html" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          </div>
          <Sidebar />
        </div>
      </div>
    </SiteLayout>
  )
}
