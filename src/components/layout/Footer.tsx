import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { getSiteSettings } from '@/lib/settings'

export default async function Footer() {
  const s = await getSiteSettings()

  return (
    <footer className="bg-primary-800 text-white pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Firma */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {s.logo_url ? (
                <img src={s.logo_url} alt="Logo" className="h-10 w-auto" />
              ) : (
                <>
                  <div className="bg-accent-500 text-primary-700 font-heading font-extrabold text-lg px-3 py-1.5 rounded-lg">ANKAR</div>
                  <div>
                    <div className="font-heading font-bold text-sm leading-tight">Parça Eşya</div>
                    <div className="font-heading font-bold text-sm leading-tight text-accent-400">Nakliye</div>
                  </div>
                </>
              )}
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {s.footer_about_text || 'Ankara parça eşya taşıma ve küçük nakliye hizmeti.'}
            </p>
            <div className="space-y-2 text-sm">
              {s.phone && <a href={`tel:${s.phone}`} className="flex items-center gap-2 text-white/80 hover:text-accent-400 transition-colors"><Phone size={16} /> {s.phone}</a>}
              {s.phone2 && <a href={`tel:${s.phone2}`} className="flex items-center gap-2 text-white/80 hover:text-accent-400 transition-colors"><Phone size={16} /> {s.phone2}</a>}
              {s.email && <a href={`mailto:${s.email}`} className="flex items-center gap-2 text-white/80 hover:text-accent-400 transition-colors"><Mail size={16} /> {s.email}</a>}
              {s.address && <div className="flex items-center gap-2 text-white/80"><MapPin size={16} /> {s.address}</div>}
              {s.working_hours && <div className="flex items-center gap-2 text-white/80"><Clock size={16} /> {s.working_hours}</div>}
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-accent-400">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li><Link href="/hizmetler/evden-eve-nakliyat" className="text-white/70 hover:text-white text-sm transition-colors">Evden Eve Nakliyat</Link></li>
              <li><Link href="/hizmetler/panelvan-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Panelvan Nakliye</Link></li>
              <li><Link href="/hizmetler/kucuk-nakliye-araci" className="text-white/70 hover:text-white text-sm transition-colors">Küçük Nakliye Aracı</Link></li>
              <li><Link href="/hizmetler/sehirler-arasi-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Şehirler Arası Nakliye</Link></li>
              <li><Link href="/hizmetler/sehir-ici-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Şehir İçi Nakliye</Link></li>
            </ul>
          </div>

          {/* Bölgeler */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-accent-400">Hizmet Bölgeleri</h3>
            <ul className="space-y-2">
              <li><Link href="/bolge/kecioren-kucuk-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Keçiören Nakliye</Link></li>
              <li><Link href="/bolge/cankaya-kucuk-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Çankaya Nakliye</Link></li>
              <li><Link href="/bolge/yenimahalle-kucuk-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Yenimahalle Nakliye</Link></li>
              <li><Link href="/bolge/etimesgut-kucuk-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Etimesgut Nakliye</Link></li>
              <li><Link href="/bolge/sincan-kucuk-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Sincan Nakliye</Link></li>
              <li><Link href="/bolge/mamak-kucuk-nakliye" className="text-white/70 hover:text-white text-sm transition-colors">Mamak Nakliye</Link></li>
            </ul>
          </div>

          {/* Sayfalar */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-accent-400">Kurumsal</h3>
            <ul className="space-y-2">
              <li><Link href="/hakkimizda" className="text-white/70 hover:text-white text-sm transition-colors">Hakkımızda</Link></li>
              <li><Link href="/galeri" className="text-white/70 hover:text-white text-sm transition-colors">Galeri</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="/teklif" className="text-white/70 hover:text-white text-sm transition-colors">Teklif Al</Link></li>
              <li><Link href="/iletisim" className="text-white/70 hover:text-white text-sm transition-colors">İletişim</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-white/50 text-sm">
          {s.footer_copyright || `© ${new Date().getFullYear()} Ankara Parça Eşya Taşıma. Tüm hakları saklıdır.`}
        </div>
      </div>
    </footer>
  )
}
