import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import SiteLayout from '@/components/layout/SiteLayout'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('hakkimizda')
  return { title: seo?.meta_title || 'Hakkımızda', description: seo?.meta_description, alternates: { canonical: seo?.canonical_url } }
}

export default async function HakkimizdaPage() {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('homepage_content').select('*').eq('section_key', 'hakkimizda').single()

  return (
    <SiteLayout>
      <div className="bg-primary-600 py-12"><div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white font-heading font-extrabold text-3xl">{data?.title || 'Hakkımızda'}</h1>
      </div></div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="content-html text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: data?.content || '<p>İçerik henüz eklenmemiş.</p>' }} />
      </div>
    </SiteLayout>
  )
}
