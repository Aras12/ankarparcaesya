import { Metadata } from 'next'
import Image from 'next/image'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import SiteLayout from '@/components/layout/SiteLayout'
import { getImageUrl } from '@/lib/constants'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Ankara parça eşya taşıma ve nakliye hizmetlerimizden fotoğraflar.',
  alternates: { canonical: 'https://ankarparcaesyanakliye.com.tr/galeri' },
}

export default async function GaleriPage() {
  const supabase = createServerSupabaseClient()
  const { data: images } = await supabase.from('gallery').select('*').eq('is_active', true).order('sort_order')

  return (
    <SiteLayout>
      <div className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white font-heading font-extrabold text-3xl">Galeri</h1>
          <p className="text-white/70 mt-2">Nakliye hizmetlerimizden fotoğraflar</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div key={img.id} className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer" style={{ animationDelay: `${i * 100}ms` }}>
                <Image src={getImageUrl(img.image_url)} alt={img.alt_text || img.title || 'Galeri'} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-heading font-bold text-sm">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-12">Henüz galeri görseli eklenmemiş.</p>
        )}
      </div>
    </SiteLayout>
  )
}
