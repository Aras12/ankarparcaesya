import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import SiteLayout from '@/components/layout/SiteLayout'
import RegionsGrid from '@/components/home/RegionsGrid'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('bolgeler')
  return { title: seo?.meta_title || 'Hizmet Bölgelerimiz', description: seo?.meta_description, alternates: { canonical: seo?.canonical_url } }
}

export default async function BolgelerPage() {
  const supabase = createServerSupabaseClient()
  const { data: regions } = await supabase.from('regions').select('*').eq('is_active', true).order('sort_order')
  return (
    <SiteLayout>
      <div className="bg-primary-600 py-12"><div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white font-heading font-extrabold text-3xl">Hizmet Bölgelerimiz</h1>
        <p className="text-white/70 mt-2">Ankara&apos;nın 25 ilçesine küçük nakliye hizmeti</p>
      </div></div>
      <RegionsGrid regions={regions || []} />
    </SiteLayout>
  )
}
