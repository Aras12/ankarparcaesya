'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Image, FileText, MapPin, Wrench, BookOpen,
  ClipboardList, Mail, Settings, LogOut, X, Star, Megaphone, Search, Camera, HelpCircle
} from 'lucide-react'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/slider', label: 'Slider', icon: Image },
  { href: '/admin/tab-makaleler', label: 'Tab Makaleler', icon: FileText },
  { href: '/admin/bolgeler', label: 'Bölgeler', icon: MapPin },
  { href: '/admin/hizmetler', label: 'Hizmetler', icon: Wrench },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/galeri', label: 'Galeri', icon: Camera },
  { href: '/admin/musteri-gorusleri', label: 'Müşteri Görüşleri', icon: Star },
  { href: '/admin/kampanyalar', label: 'Kampanyalar', icon: Megaphone },
  { href: '/admin/sss', label: 'SSS (Sorular)', icon: HelpCircle },
  { href: '/admin/basvurular', label: 'Teklif Başvuruları', icon: ClipboardList },
  { href: '/admin/iletisim-formlari', label: 'İletişim Formları', icon: Mail },
  { href: '/admin/sayfa-seo', label: 'Sayfa SEO', icon: Search },
  { href: '/admin/ayarlar', label: 'Site Ayarları', icon: Settings },
]

export default function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/giris')
  }

  const isActive = (href: string) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <>
      {open && <div className="md:hidden fixed inset-0 bg-black/50 z-20" onClick={onClose} />}
      <aside className={`admin-sidebar ${open ? 'open' : ''}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 text-slate-900 font-extrabold text-sm px-2 py-1 rounded">AP</div>
            <span className="font-bold text-white text-sm">Admin Panel</span>
          </div>
          <button onClick={onClose} className="md:hidden text-white/60 hover:text-white"><X size={20} /></button>
        </div>
        <nav className="py-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {menuItems.map((item) => (
            <a key={item.href} href={item.href}
              onClick={(e) => { e.preventDefault(); router.push(item.href); onClose() }}
              className={`admin-sidebar-link ${isActive(item.href) ? 'active' : ''}`}>
              <item.icon size={17} /> {item.label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <a href="/" target="_blank" className="admin-sidebar-link text-xs mb-1">🌐 Siteyi Görüntüle</a>
          <button onClick={handleLogout} className="admin-sidebar-link w-full text-red-400 hover:text-red-300"><LogOut size={17} /> Çıkış Yap</button>
        </div>
      </aside>
    </>
  )
}
