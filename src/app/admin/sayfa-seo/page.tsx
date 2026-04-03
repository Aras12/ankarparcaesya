'use client'

import { useEffect, useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'

const pages = [
  { key: 'homepage', label: 'Ana Sayfa' },
  { key: 'hizmetler', label: 'Hizmetler' },
  { key: 'bolgeler', label: 'Bölgeler' },
  { key: 'blog', label: 'Blog' },
  { key: 'teklif', label: 'Teklif Al' },
  { key: 'iletisim', label: 'İletişim' },
  { key: 'hakkimizda', label: 'Hakkımızda' },
  { key: 'galeri', label: 'Galeri' },
]

export default function AdminSayfaSeoPage() {
  const [data, setData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: rows } = await supabase.from('page_seo').select('*')
      const obj: Record<string, any> = {}
      rows?.forEach(r => { obj[r.page_key] = r })
      setData(obj); setLoading(false)
    }
    load()
  }, [])

  const savePage = async (key: string) => {
    const item = data[key]
    if (!item) return
    if (item.id) {
      await supabase.from('page_seo').update({
        meta_title: item.meta_title, meta_description: item.meta_description,
        canonical_url: item.canonical_url, og_image: item.og_image,
      }).eq('id', item.id)
    } else {
      await supabase.from('page_seo').insert([{ page_key: key, ...item }])
    }
    setSaved(key); setTimeout(() => setSaved(''), 2000)
  }

  const update = (key: string, field: string, val: string) => {
    setData(prev => ({ ...prev, [key]: { ...prev[key], page_key: key, [field]: val } }))
  }

  if (loading) return <p className="text-gray-400">Yükleniyor...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Sayfa SEO Yönetimi</h1>
      <p className="text-gray-500 text-sm mb-6">Her sayfanın meta başlık, açıklama, canonical URL ve öne çıkan görselini buradan yönetin.</p>

      <div className="space-y-4">
        {pages.map(page => {
          const item = data[page.key] || {}
          return (
            <div key={page.key} className="admin-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-slate-700">📄 {page.label}</h3>
                <div className="flex items-center gap-2">
                  {saved === page.key && <span className="text-green-600 text-xs flex items-center gap-1"><CheckCircle size={14} /> Kaydedildi</span>}
                  <button onClick={() => savePage(page.key)} className="admin-btn admin-btn-primary text-xs"><Save size={14} /> Kaydet</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Meta Başlık</label><input className="admin-input text-sm" value={item.meta_title || ''} onChange={(e) => update(page.key, 'meta_title', e.target.value)} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Canonical URL</label><input className="admin-input text-sm" value={item.canonical_url || ''} onChange={(e) => update(page.key, 'canonical_url', e.target.value)} /></div>
                <div className="md:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Meta Açıklama</label><textarea className="admin-input text-sm" rows={2} value={item.meta_description || ''} onChange={(e) => update(page.key, 'meta_description', e.target.value)} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">OG Image</label><ImageUpload value={item.og_image || ''} onChange={(url) => update(page.key, 'og_image', url)} /></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
