import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import SiteLayout from '@/components/layout/SiteLayout'
import ServicesGrid from '@/components/home/ServicesGrid'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('hizmetler')
  return { title: seo?.meta_title || 'Hizmetlerimiz', description: seo?.meta_description, alternates: { canonical: seo?.canonical_url } }
}

export default async function HizmetlerPage() {
  const supabase = createServerSupabaseClient()
  const { data: services } = await supabase.from('services').select('*').eq('is_active', true).order('sort_order')
  return (
    <SiteLayout>
      <div className="bg-primary-600 py-12"><div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white font-heading font-extrabold text-3xl">Hizmetlerimiz</h1>
        <p className="text-white/70 mt-2">Ankara genelinde sunduğumuz nakliye hizmetleri</p>
      </div></div>
      <ServicesGrid services={services || []} />
    </SiteLayout>
  )
}
