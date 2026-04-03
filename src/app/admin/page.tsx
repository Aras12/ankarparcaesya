'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Image, FileText, MapPin, Wrench, BookOpen, ClipboardList, Mail } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const tables = [
        { key: 'sliders', table: 'sliders' },
        { key: 'tab_articles', table: 'tab_articles' },
        { key: 'regions', table: 'regions' },
        { key: 'services', table: 'services' },
        { key: 'blog_posts', table: 'blog_posts' },
        { key: 'quotes', table: 'quote_requests' },
        { key: 'contacts', table: 'contact_submissions' },
      ]
      const results: Record<string, number> = {}
      for (const t of tables) {
        const { count } = await supabase.from(t.table).select('*', { count: 'exact', head: true })
        results[t.key] = count || 0
      }
      // Okunmamış
      const { count: unreadQuotes } = await supabase.from('quote_requests').select('*', { count: 'exact', head: true }).eq('is_read', false)
      const { count: unreadContacts } = await supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false)
      results.unread_quotes = unreadQuotes || 0
      results.unread_contacts = unreadContacts || 0
      setStats(results)
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Slider', count: stats.sliders, icon: Image, href: '/admin/slider', color: 'bg-purple-500' },
    { label: 'Tab Makaleler', count: stats.tab_articles, icon: FileText, href: '/admin/tab-makaleler', color: 'bg-cyan-500' },
    { label: 'Bölgeler', count: stats.regions, icon: MapPin, href: '/admin/bolgeler', color: 'bg-emerald-500' },
    { label: 'Hizmetler', count: stats.services, icon: Wrench, href: '/admin/hizmetler', color: 'bg-orange-500' },
    { label: 'Blog Yazıları', count: stats.blog_posts, icon: BookOpen, href: '/admin/blog', color: 'bg-blue-500' },
    { label: 'Teklif Başvuruları', count: stats.quotes, icon: ClipboardList, href: '/admin/basvurular', color: 'bg-yellow-500', badge: stats.unread_quotes },
    { label: 'İletişim Formları', count: stats.contacts, icon: Mail, href: '/admin/iletisim-formlari', color: 'bg-red-500', badge: stats.unread_contacts },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map((card) => (
            <a key={card.label} href={card.href} className="admin-card hover:shadow-md transition-all relative">
              <div className="flex items-center gap-4">
                <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  <card.icon size={22} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{card.count ?? '-'}</div>
                  <div className="text-sm text-slate-500">{card.label}</div>
                </div>
              </div>
              {card.badge ? (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {card.badge} yeni
                </span>
              ) : null}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
