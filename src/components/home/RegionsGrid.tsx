import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Region } from '@/lib/types'
import { getImageUrl } from '@/lib/constants'

export default function RegionsGrid({ regions, showAllLink }: { regions: Region[]; showAllLink?: boolean }) {
  if (!regions.length) return null

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-700 mb-3">
            Hizmet Bölgelerimiz
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Ankara&apos;nın tüm ilçelerine parça eşya taşıma ve küçük nakliye hizmeti veriyoruz.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {regions.map((region) => (
            <Link
              key={region.id}
              href={`/bolge/${region.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-primary-200"
            >
              <div className="relative h-28 overflow-hidden">
                <Image
                  src={getImageUrl(region.image_url)}
                  alt={region.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
              </div>
              <div className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-primary-600 font-semibold text-sm">
                  <MapPin size={14} />
                  {region.name}
                </div>
                <span className="text-xs text-gray-400">Küçük Nakliye</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/bolge"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Tüm Bölgeleri Gör →
          </Link>
        </div>
      </div>
    </section>
  )
}
