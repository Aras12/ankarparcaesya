import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/constants'

interface Campaign {
  id: string; title: string; description: string | null; image_url: string | null; button_text: string | null; button_link: string | null
}

export default function CampaignSection({ campaigns }: { campaigns: Campaign[] }) {
  if (!campaigns.length) return null

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-6">
          {campaigns.map((c, i) => (
            <div key={c.id} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100`}>
              {c.image_url && (
                <div className="relative w-full md:w-1/2 h-56 md:h-72">
                  <Image src={getImageUrl(c.image_url)} alt={c.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 p-6 md:p-8">
                <div className="inline-block bg-accent-100 text-accent-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Kampanya</div>
                <h3 className="font-heading font-extrabold text-xl md:text-2xl text-primary-700 mb-3">{c.title}</h3>
                {c.description && <p className="text-gray-600 leading-relaxed mb-4">{c.description}</p>}
                {c.button_text && c.button_link && (
                  <Link href={c.button_link} className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2.5 rounded-lg transition-all">
                    {c.button_text}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
