'use client'

import { useEffect, useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import RichEditor from '@/components/admin/RichEditor'

export default function AdminAyarlarPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('site_settings').select('*')
      const obj: Record<string, string> = {}
      data?.forEach((s) => { obj[s.key] = s.value || '' })
      setSettings(obj); setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' })
    }
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000)
  }

  const u = (key: string, val: string) => setSettings(prev => ({ ...prev, [key]: val }))

  if (loading) return <p className="text-gray-400 p-4">Yükleniyor...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Site Ayarları</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="flex items-center gap-1 text-green-600 text-sm font-semibold"><CheckCircle size={16} /> Kaydedildi!</span>}
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary disabled:opacity-50"><Save size={16} /> {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}</button>
        </div>
      </div>

      {/* Logo & Görsel */}
      <div className="admin-card mb-4">
        <h2 className="font-bold text-base text-slate-700 mb-4">🖼️ Logo & Görseller</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-2">Site Logosu</label><ImageUpload value={settings.logo_url || ''} onChange={(url) => u('logo_url', url)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-2">Favicon</label><ImageUpload value={settings.favicon_url || ''} onChange={(url) => u('favicon_url', url)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-2">OG Image (Paylaşım Görseli)</label><ImageUpload value={settings.og_image || ''} onChange={(url) => u('og_image', url)} /></div>
        </div>
      </div>

      {/* Temel Bilgiler */}
      <div className="admin-card mb-4">
        <h2 className="font-bold text-base text-slate-700 mb-4">📋 Temel Bilgiler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Site Başlığı</label><input className="admin-input" value={settings.site_title || ''} onChange={(e) => u('site_title', e.target.value)} /></div>
          <div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-1">Site Açıklaması</label><textarea className="admin-input" rows={2} value={settings.site_description || ''} onChange={(e) => u('site_description', e.target.value)} /></div>
        </div>
      </div>

      {/* İletişim */}
      <div className="admin-card mb-4">
        <h2 className="font-bold text-base text-slate-700 mb-4">📞 İletişim Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Telefon 1</label><input className="admin-input" value={settings.phone || ''} onChange={(e) => u('phone', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Telefon 2</label><input className="admin-input" value={settings.phone2 || ''} onChange={(e) => u('phone2', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">E-posta</label><input className="admin-input" value={settings.email || ''} onChange={(e) => u('email', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp (905...)</label><input className="admin-input" value={settings.whatsapp || ''} onChange={(e) => u('whatsapp', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Adres</label><input className="admin-input" value={settings.address || ''} onChange={(e) => u('address', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Çalışma Saatleri</label><input className="admin-input" value={settings.working_hours || ''} onChange={(e) => u('working_hours', e.target.value)} /></div>
          <div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-1">Google Maps Embed URL</label><textarea className="admin-input" rows={2} value={settings.google_maps_embed || ''} onChange={(e) => u('google_maps_embed', e.target.value)} /></div>
        </div>
      </div>

      {/* Sosyal Medya */}
      <div className="admin-card mb-4">
        <h2 className="font-bold text-base text-slate-700 mb-4">🌐 Sosyal Medya</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Facebook</label><input className="admin-input" value={settings.facebook || ''} onChange={(e) => u('facebook', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Instagram</label><input className="admin-input" value={settings.instagram || ''} onChange={(e) => u('instagram', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Twitter/X</label><input className="admin-input" value={settings.twitter || ''} onChange={(e) => u('twitter', e.target.value)} /></div>
        </div>
      </div>

      {/* Site Doğrulama */}
      <div className="admin-card mb-4">
        <h2 className="font-bold text-base text-slate-700 mb-4">🔍 Arama Motoru Doğrulama Kodları</h2>
        <p className="text-xs text-gray-500 mb-3">Meta tag content değerlerini girin (sadece content kısmı, tag değil)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Google Verification</label><input className="admin-input" value={settings.google_verification || ''} onChange={(e) => u('google_verification', e.target.value)} placeholder="google-site-verification değeri" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Yandex Verification</label><input className="admin-input" value={settings.yandex_verification || ''} onChange={(e) => u('yandex_verification', e.target.value)} placeholder="yandex-verification değeri" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Bing Verification</label><input className="admin-input" value={settings.bing_verification || ''} onChange={(e) => u('bing_verification', e.target.value)} placeholder="msvalidate.01 değeri" /></div>
        </div>
      </div>

      {/* Top Bar Düzenleme */}
      <div className="admin-card mb-4">
        <h2 className="font-bold text-base text-slate-700 mb-4">📢 Üst Bar (Top Bar)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-1">Top Bar Yazısı</label><input className="admin-input" value={settings.topbar_text || ''} onChange={(e) => u('topbar_text', e.target.value)} placeholder="Her Gün: 07:00 - 22:00 | Ankara Geneli Hizmet" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={settings.topbar_active === 'true'} onChange={(e) => u('topbar_active', e.target.checked ? 'true' : 'false')} id="topbar_active" className="w-4 h-4" /><label htmlFor="topbar_active" className="text-sm font-semibold">Top Bar Aktif</label></div>
        </div>
      </div>

      {/* Anasayfa OG Tags & Yapısal Veri */}
      <div className="admin-card mb-4">
        <h2 className="font-bold text-base text-slate-700 mb-4">🏷️ Anasayfa OG Tags & Yapısal Veri</h2>
        <p className="text-xs text-gray-500 mb-3">Sosyal medyada paylaşım ve Google yapısal veri ayarları</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">OG Title</label><input className="admin-input" value={settings.homepage_og_title || ''} onChange={(e) => u('homepage_og_title', e.target.value)} placeholder="Ankara Parça Eşya Taşıma" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">OG Description</label><input className="admin-input" value={settings.homepage_og_description || ''} onChange={(e) => u('homepage_og_description', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-2">OG Image (Paylaşım Görseli)</label><ImageUpload value={settings.homepage_og_image || ''} onChange={(url) => u('homepage_og_image', url)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Schema Type</label>
            <select className="admin-input" value={settings.homepage_schema_type || 'LocalBusiness'} onChange={(e) => u('homepage_schema_type', e.target.value)}>
              <option value="LocalBusiness">LocalBusiness</option>
              <option value="MovingCompany">MovingCompany</option>
              <option value="Organization">Organization</option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer Düzenleme */}
      <div className="admin-card mb-4">
        <h2 className="font-bold text-base text-slate-700 mb-4">📌 Footer Düzenleme</h2>
        <div className="grid grid-cols-1 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Footer Hakkımızda Yazısı</label><textarea className="admin-input" rows={3} value={settings.footer_about_text || ''} onChange={(e) => u('footer_about_text', e.target.value)} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Copyright Yazısı</label><input className="admin-input" value={settings.footer_copyright || ''} onChange={(e) => u('footer_copyright', e.target.value)} /></div>
        </div>
      </div>

      {/* Anasayfa H1 Makale */}
      <HomepageContentEditor />
      {/* Hakkımızda */}
      <ContentSectionEditor sectionKey="hakkimizda" title="📄 Hakkımızda Sayfası" />
    </div>
  )
}

function HomepageContentEditor() {
  const [data, setData] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: d } = await supabase.from('homepage_content').select('*').eq('section_key', 'hero_article').single()
      if (d) setData({ title: d.title || '', content: d.content || '' })
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    await supabase.from('homepage_content').update({ title: data.title, content: data.content }).eq('section_key', 'hero_article')
    setSaved(true); setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return null

  return (
    <div className="admin-card mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base text-slate-700">📝 Anasayfa H1 Makale Alanı</h2>
        <div className="flex items-center gap-2">
          {saved && <span className="text-green-600 text-xs flex items-center gap-1"><CheckCircle size={14} /> Kaydedildi</span>}
          <button onClick={handleSave} className="admin-btn admin-btn-primary text-xs"><Save size={14} /> Kaydet</button>
        </div>
      </div>
      <div className="space-y-4">
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">H1 Başlık</label><input className="admin-input" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">İçerik</label><RichEditor value={data.content} onChange={(html) => setData({ ...data, content: html })} rows={6} /></div>
      </div>
    </div>
  )
}

function ContentSectionEditor({ sectionKey, title }: { sectionKey: string; title: string }) {
  const [data, setData] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: d } = await supabase.from('homepage_content').select('*').eq('section_key', sectionKey).single()
      if (d) setData({ title: d.title || '', content: d.content || '' })
      setLoading(false)
    }
    load()
  }, [sectionKey])

  const handleSave = async () => {
    const { data: existing } = await supabase.from('homepage_content').select('id').eq('section_key', sectionKey).single()
    if (existing) {
      await supabase.from('homepage_content').update({ title: data.title, content: data.content }).eq('section_key', sectionKey)
    } else {
      await supabase.from('homepage_content').insert([{ section_key: sectionKey, title: data.title, content: data.content }])
    }
    setSaved(true); setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return null

  return (
    <div className="admin-card mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base text-slate-700">{title}</h2>
        <div className="flex items-center gap-2">
          {saved && <span className="text-green-600 text-xs flex items-center gap-1"><CheckCircle size={14} /> Kaydedildi</span>}
          <button onClick={handleSave} className="admin-btn admin-btn-primary text-xs"><Save size={14} /> Kaydet</button>
        </div>
      </div>
      <div className="space-y-4">
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Başlık</label><input className="admin-input" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">İçerik</label><RichEditor value={data.content} onChange={(html) => setData({ ...data, content: html })} rows={8} /></div>
      </div>
    </div>
  )
}
