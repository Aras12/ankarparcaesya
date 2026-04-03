import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: string; name: string; location: string | null; comment: string; rating: number
}

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
  if (!items.length) return null

  return (
    <section className="py-12 md:py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-700 mb-3">Müşteri Görüşleri</h2>
          <p className="text-gray-500">Müşterilerimizin memnuniyeti bizim için en değerli referanstır.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t) => (
            <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
              <Quote size={24} className="text-accent-400 mb-3 opacity-60" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.comment}</p>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < t.rating ? 'text-accent-500 fill-accent-500' : 'text-gray-300'} />
                ))}
              </div>
              <div className="font-heading font-bold text-sm text-primary-700">{t.name}</div>
              {t.location && <div className="text-xs text-gray-400">{t.location}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
