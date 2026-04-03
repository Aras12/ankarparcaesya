import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { getPageSeo, getSiteSettings } from '@/lib/settings'
import SiteLayout from '@/components/layout/SiteLayout'
import ContactForm from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('iletisim')
  return { title: seo?.meta_title || 'İletişim', description: seo?.meta_description, alternates: { canonical: seo?.canonical_url } }
}

export default async function IletisimPage() {
  const s = await getSiteSettings()

  return (
    <SiteLayout>
      <div className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white font-heading font-extrabold text-3xl">İletişim</h1>
          <p className="text-white/70 mt-2">Bize ulaşın, size yardımcı olalım</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* İletişim bilgileri - DB'den */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-heading font-bold text-lg text-primary-700 mb-4">İletişim Bilgileri</h2>
              <div className="space-y-4 text-sm">
                {s.phone && (
                  <a href={`tel:${s.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center"><Phone size={18} className="text-primary-600" /></div>
                    <div><div className="font-semibold">Telefon</div><div>{s.phone}</div></div>
                  </a>
                )}
                {s.phone2 && (
                  <a href={`tel:${s.phone2}`} className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center"><Phone size={18} className="text-primary-600" /></div>
                    <div><div className="font-semibold">Telefon 2</div><div>{s.phone2}</div></div>
                  </a>
                )}
                {s.email && (
                  <a href={`mailto:${s.email}`} className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center"><Mail size={18} className="text-primary-600" /></div>
                    <div><div className="font-semibold">E-posta</div><div>{s.email}</div></div>
                  </a>
                )}
                {s.address && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center"><MapPin size={18} className="text-primary-600" /></div>
                    <div><div className="font-semibold">Adres</div><div>{s.address}</div></div>
                  </div>
                )}
                {s.working_hours && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center"><Clock size={18} className="text-primary-600" /></div>
                    <div><div className="font-semibold">Çalışma Saatleri</div><div>{s.working_hours}</div></div>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp */}
            {s.whatsapp && (
              <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-center transition-all">
                WhatsApp ile Yazın
              </a>
            )}

            {/* Harita */}
            {s.google_maps_embed && (
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <iframe src={s.google_maps_embed} width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            )}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
