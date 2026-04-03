'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/constants'

interface GalleryItem {
  id: string; title: string | null; image_url: string; alt_text: string | null
}

export default function GallerySection({ images }: { images: GalleryItem[] }) {
  if (!images.length) return null

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-700 mb-3">Galeri</h2>
          <p className="text-gray-500">Nakliye hizmetlerimizden kareler</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.slice(0, 6).map((img, i) => (
            <div
              key={img.id}
              className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-md cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Image
                src={getImageUrl(img.image_url)}
                alt={img.alt_text || img.title || 'Ankara nakliye'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* ANKAR animasyon overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-accent-500 text-primary-800 font-heading font-extrabold text-xs px-2 py-1 rounded animate-pulse">
                    ANKAR
                  </span>
                  {img.title && <span className="text-white text-xs font-medium">{img.title}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/galeri" className="inline-block border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all">
            Tüm Galeriyi Gör →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
