import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import SiteLayout from '@/components/layout/SiteLayout'
import Sidebar from '@/components/layout/Sidebar'
import { getImageUrl } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('regions').select('*').eq('slug', params.slug).single()
  if (!data) return {}
  return {
    title: data.title || `${data.name} Küçük Nakliye`,
    description: data.meta_description,
    alternates: { canonical: `https://ankarparcaesyanakliye.com.tr/bolge/${data.slug}` },
    openGraph: { title: data.title || `${data.name} Küçük Nakliye`, description: data.meta_description || '', images: data.image_url ? [{ url: getImageUrl(data.image_url) }] : [] },
  }
}

export default async function RegionDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: region } = await supabase.from('regions').select('*').eq('slug', params.slug).single()
  if (!region) notFound()

  const { data: gallery } = await supabase.from('region_gallery').select('*').eq('region_id', region.id).order('sort_order')

  return (
    <SiteLayout>
      <div className="relative h-56 md:h-72 bg-primary-900">
        <Image src={getImageUrl(region.image_url)} alt={region.name} fill className="object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center"><div className="max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-white font-heading font-extrabold text-2xl md:text-4xl">{region.name} Küçük Nakliye</h1>
        </div></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {region.content ? (
              <div className="content-html" dangerouslySetInnerHTML={{ __html: region.content }} />
            ) : (
              <div className="content-html"><p>{region.name} bölgesinde parça eşya taşıma ve küçük nakliye hizmeti veriyoruz.</p></div>
            )}
            {gallery && gallery.length > 0 && (
              <div className="mt-8">
                <h2 className="font-heading font-bold text-xl text-primary-700 mb-4">{region.name} Galeri</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gallery.map(img => (
                    <div key={img.id} className="relative h-40 rounded-lg overflow-hidden">
                      <Image src={getImageUrl(img.image_url)} alt={img.alt_text || region.name} fill className="object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-10 bg-accent-50 border border-accent-200 rounded-xl p-6 text-center">
              <h2 className="font-heading font-bold text-xl text-primary-700 mb-3">{region.name} Nakliye Teklifi</h2>
              <a href="/teklif" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-lg">Teklif Al</a>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </SiteLayout>
  )
}
