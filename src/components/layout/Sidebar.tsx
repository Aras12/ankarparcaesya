import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Wrench, BookOpen } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function Sidebar() {
  const supabase = createServerSupabaseClient()
  const [{ data: services }, { data: regions }, { data: posts }, { data: settings }] = await Promise.all([
    supabase.from('services').select('name, slug').eq('is_active', true).order('sort_order').limit(6),
    supabase.from('regions').select('name, slug').eq('is_active', true).order('sort_order').limit(8),
    supabase.from('blog_posts').select('title, slug').eq('is_published', true).order('published_at', { ascending: false }).limit(5),
    supabase.from('site_settings').select('key, value').in('key', ['phone', 'whatsapp']),
  ])

  const s: Record<string, string> = {}
  settings?.forEach(i => { s[i.key] = i.value || '' })

  return (
    <aside className="space-y-6">
      {/* CTA */}
      <div className="bg-primary-600 rounded-xl p-5 text-center">
        <h3 className="text-white font-heading font-bold text-lg mb-2">Hemen Teklif Al</h3>
        <p className="text-white/70 text-sm mb-4">Ücretsiz fiyat teklifi için arayın</p>
        <a href={`tel:+${s.whatsapp || ''}`} className="block bg-accent-500 text-primary-800 font-bold py-2.5 rounded-lg mb-2 text-sm"><Phone size={16} className="inline mr-1" /> {s.phone || 'Ara'}</a>
        <a href={`https://wa.me/${s.whatsapp || ''}`} target="_blank" className="block bg-green-500 text-white font-bold py-2.5 rounded-lg text-sm">
          <svg className="inline w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.287 0-4.405-.744-6.122-2.003l-.348-.262-3.278 1.098 1.098-3.278-.262-.348A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
          WhatsApp
        </a>
      </div>

      {/* Hizmetler */}
      {services && services.length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-heading font-bold text-base text-primary-700 mb-3 flex items-center gap-2"><Wrench size={16} /> Hizmetlerimiz</h3>
          <ul className="space-y-2">
            {services.map(s => (
              <li key={s.slug}><Link href={`/hizmetler/${s.slug}`} className="text-gray-600 hover:text-primary-600 text-sm transition-colors block">{s.name}</Link></li>
            ))}
          </ul>
        </div>
      )}

      {/* Bölgeler */}
      {regions && regions.length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-heading font-bold text-base text-primary-700 mb-3 flex items-center gap-2"><MapPin size={16} /> Bölgeler</h3>
          <ul className="space-y-2">
            {regions.map(r => (
              <li key={r.slug}><Link href={`/bolge/${r.slug}`} className="text-gray-600 hover:text-primary-600 text-sm transition-colors block">{r.name}</Link></li>
            ))}
          </ul>
        </div>
      )}

      {/* Son Yazılar */}
      {posts && posts.length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-heading font-bold text-base text-primary-700 mb-3 flex items-center gap-2"><BookOpen size={16} /> Son Yazılar</h3>
          <ul className="space-y-2">
            {posts.map(p => (
              <li key={p.slug}><Link href={`/blog/${p.slug}`} className="text-gray-600 hover:text-primary-600 text-sm transition-colors block line-clamp-1">{p.title}</Link></li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
