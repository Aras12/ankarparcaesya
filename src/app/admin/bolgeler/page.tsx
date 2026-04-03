'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, Save, X, ImagePlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import RichEditor from '@/components/admin/RichEditor'

export default function AdminBolgelerPage() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any | null>(null)
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const load = useCallback(async () => {
    const { data } = await supabase.from('regions').select('*').order('sort_order')
    setItems(data || []); setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const loadGallery = async (regionId: string) => {
    const { data } = await supabase.from('region_gallery').select('*').eq('region_id', regionId).order('sort_order')
    setGallery(data || [])
  }

  const handleEdit = (item: any) => {
    setEditing(JSON.parse(JSON.stringify(item)))
    loadGallery(item.id)
  }

  const save = async () => {
    if (!editing || saving) return
    setSaving(true)
    const p = { ...editing }; delete p.created_at; delete p.updated_at
    if (editing.id) {
      const { error } = await supabase.from('regions').update(p).eq('id', editing.id)
      if (error) { alert(error.message); setSaving(false); return }
    } else {
      delete p.id
      const { error } = await supabase.from('regions').insert([p])
      if (error) { alert(error.message); setSaving(false); return }
    }
    setEditing(null); setGallery([]); await load(); setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await supabase.from('regions').delete().eq('id', id); load()
  }

  const addGalleryImage = async (url: string) => {
    if (!editing?.id) return
    await supabase.from('region_gallery').insert([{ region_id: editing.id, image_url: url, sort_order: gallery.length }])
    loadGallery(editing.id)
  }

  const removeGalleryImage = async (id: string) => {
    await supabase.from('region_gallery').delete().eq('id', id)
    if (editing?.id) loadGallery(editing.id)
  }

  const u = (key: string, val: any) => setEditing((p: any) => p ? { ...p, [key]: val } : null)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Bölge Yönetimi (İlçeler)</h1>
        <button onClick={() => { setEditing({ name: '', slug: '', title: '', meta_description: '', content: '', image_url: '', sort_order: 0, is_active: true }); setGallery([]) }} className="admin-btn admin-btn-primary"><Plus size={18} /> Yeni Ekle</button>
      </div>

      {editing && (
        <div className="admin-card mb-6 border-2 border-blue-200">
          <h2 className="font-bold text-lg mb-4 text-blue-700">{editing.id ? '✏️ Düzenle' : '➕ Yeni Ekle'}</h2>

          {/* Temel bilgiler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm font-semibold text-gray-700 mb-1">İlçe Adı *</label><input className="admin-input" value={editing.name || ''} onChange={(e) => u('name', e.target.value)} /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL) *</label><input className="admin-input" value={editing.slug || ''} onChange={(e) => u('slug', e.target.value)} placeholder="kecioren-kucuk-nakliye" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Sıra</label><input type="number" className="admin-input" value={editing.sort_order || 0} onChange={(e) => u('sort_order', parseInt(e.target.value) || 0)} /></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={editing.is_active ?? true} onChange={(e) => u('is_active', e.target.checked)} id="active" className="w-4 h-4" /><label htmlFor="active" className="text-sm font-semibold">Aktif</label></div>
          </div>

          {/* SEO Alanları - BAĞIMSIZ */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-sm text-blue-700 mb-3">🔍 SEO Ayarları (İsimden bağımsız)</h3>
            <div className="grid grid-cols-1 gap-4">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Meta Başlık (Title Tag)</label><input className="admin-input" value={editing.title || ''} onChange={(e) => u('title', e.target.value)} placeholder="Keçiören Küçük Nakliye | Parça Eşya Taşıma" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Meta Açıklama (Description)</label><textarea className="admin-input" rows={2} value={editing.meta_description || ''} onChange={(e) => u('meta_description', e.target.value)} placeholder="Keçiören küçük nakliye ve parça eşya taşıma hizmeti..." /></div>
            </div>
          </div>

          {/* İçerik */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sayfa İçeriği</label>
            <RichEditor value={editing.content || ''} onChange={(html) => u('content', html)} rows={8} placeholder="Bölge içerik yazısı..." />
          </div>

          {/* Öne Çıkan Görsel */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Öne Çıkan Görsel</label>
            <ImageUpload value={editing.image_url || ''} onChange={(url) => u('image_url', url)} />
          </div>

          {/* Bölge Galerisi */}
          {editing.id && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-sm text-gray-700 mb-3">🖼️ Bölge Galerisi</h3>
              <div className="flex flex-wrap gap-3 mb-3">
                {gallery.map((img) => (
                  <div key={img.id} className="relative">
                    <img src={img.image_url} alt="" className="w-24 h-20 object-cover rounded-lg border" />
                    <button onClick={() => removeGalleryImage(img.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✕</button>
                  </div>
                ))}
                <ImageUpload value="" onChange={(url) => addGalleryImage(url)} />
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t">
            <button onClick={save} disabled={saving} className="admin-btn admin-btn-primary disabled:opacity-50"><Save size={16} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
            <button onClick={() => { setEditing(null); setGallery([]) }} className="admin-btn admin-btn-secondary"><X size={16} /> İptal</button>
          </div>
        </div>
      )}

      <div className="admin-card overflow-x-auto">
        {loading ? <p className="text-gray-400 py-4">Yükleniyor...</p> : (
          <table className="admin-table">
            <thead><tr><th>#</th><th>İlçe</th><th>Slug</th><th>Durum</th><th>Sıra</th><th>İşlem</th></tr></thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td className="font-semibold">{item.name}</td>
                  <td className="text-gray-400 text-xs font-mono">{item.slug}</td>
                  <td><span className={`admin-badge ${item.is_active ? 'admin-badge-green' : 'admin-badge-red'}`}>{item.is_active ? 'Aktif' : 'Pasif'}</span></td>
                  <td>{item.sort_order}</td>
                  <td><div className="flex gap-1">
                    <button onClick={() => handleEdit(item)} className="admin-btn admin-btn-secondary text-xs"><Pencil size={14} /></button>
                    <button onClick={() => remove(item.id)} className="admin-btn admin-btn-danger text-xs"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
