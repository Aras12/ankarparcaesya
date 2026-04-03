import Link from 'next/link'
import Image from 'next/image'
import { Service } from '@/lib/types'
import { getImageUrl, iconMap } from '@/lib/constants'

export default function ServicesGrid({ services }: { services: Service[] }) {
  if (!services.length) return null

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-700 mb-3">
            Hizmetlerimiz
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Ankara genelinde profesyonel nakliye ve taşımacılık hizmetleri sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/hizmetler/${service.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-accent-300"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={getImageUrl(service.image_url)}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-accent-500 text-primary-800 px-3 py-1 rounded-full text-xs font-bold">
                  {iconMap[service.icon] || '📦'} {service.name}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-primary-700 mb-2 group-hover:text-accent-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.short_description}
                </p>
                <span className="inline-block mt-3 text-primary-600 font-semibold text-sm group-hover:text-accent-700 transition-colors">
                  Detaylı Bilgi →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
