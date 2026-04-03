import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import SiteLayout from '@/components/layout/SiteLayout'
import { getImageUrl } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('tab_articles').select('*').eq('slug', params.slug).single()
  if (!data) return {}
  return {
    title: data.title, description: data.meta_description,
    alternates: { canonical: `https://ankarparcaesyanakliye.com.tr/makaleler/${data.slug}` },
    openGraph: { title: data.title, description: data.meta_description || '', images: [{ url: getImageUrl(data.image_url) }] },
  }
}

export default async function MakaleDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: article } = await supabase.from('tab_articles').select('*').eq('slug', params.slug).single()
  if (!article) notFound()

  return (
    <SiteLayout>
      <div className="relative h-64 md:h-72 bg-primary-900">
        <Image src={getImageUrl(article.image_url)} alt={article.title} fill className="object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-white font-heading font-extrabold text-2xl md:text-4xl">{article.title}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <div className="content-html" dangerouslySetInnerHTML={{ __html: article.content || '' }} />
        <div className="mt-10 bg-accent-50 border border-accent-200 rounded-xl p-6 text-center">
          <h2 className="font-heading font-bold text-xl text-primary-700 mb-3">Hemen Teklif Alın</h2>
          <a href="/teklif" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-lg transition-all">Teklif Al</a>
        </div>
      </div>
    </SiteLayout>
  )
}
