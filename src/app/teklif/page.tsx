import { Metadata } from 'next'
import { getPageSeo } from '@/lib/settings'
import SiteLayout from '@/components/layout/SiteLayout'
import TeklifForm from '@/components/TeklifForm'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('teklif')
  return { title: seo?.meta_title || 'Teklif Al', description: seo?.meta_description, alternates: { canonical: seo?.canonical_url } }
}

export default async function TeklifPage() {
  return (
    <SiteLayout>
      <TeklifForm />
    </SiteLayout>
  )
}
