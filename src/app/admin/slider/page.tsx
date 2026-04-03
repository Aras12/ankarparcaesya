'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { Slider } from '@/lib/types'

const emptySlider = { title: '', subtitle: '', image_url: '', button_text: 'Hemen Teklif Al', button_link: '/teklif', is_active: true, sort_order: 0 }

export default function AdminSliderPage() {
  const [items, setItems] = useState<Slider[]>([])
  const [editing, setEditing] = useState<Partial<Slider> | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const load = async () => {
    const { data } = await supabase.from('sliders').select('*').order('sort_order')
    setItems(data || []); setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (editing.id) {
      await supabase.from('sliders').update(editing).eq('id', editing.id)
    } else {
      await supabase.from('sliders').insert([editing])
    }
    setEditing(null); load()
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await supabase.from('sliders').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Slider Yönetimi</h1>
        <button onClick={() => setEditing({ ...emptySlider })} className="admin-btn admin-btn-primary">
          <Plus size={18} /> Yeni Ekle
        </button>
      </div>

      {/* Düzenleme formu */}
      {editing && (
        <div className="admin-card mb-6">
          <h2 className="font-bold text-lg mb-4">{editing.id ? 'Düzenle' : 'Yeni Slider'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Başlık</label>
              <input className="admin-input" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Alt Başlık</label>
              <input className="admin-input" value={editing.subtitle || ''} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Buton Yazısı</label>
              <input className="admin-input" value={editing.button_text || ''} onChange={(e) => setEditing({ ...editing, button_text: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Buton Linki</label>
              <input className="admin-input" value={editing.button_link || ''} onChange={(e) => setEditing({ ...editing, button_link: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sıra</label>
              <input type="number" className="admin-input" value={editing.sort_order || 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) })} />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" checked={editing.is_active ?? true} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} id="active" />
              <label htmlFor="active" className="text-sm font-semibold text-gray-700">Aktif</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Görsel</label>
            <ImageUpload value={editing.image_url || ''} onChange={(url) => setEditing({ ...editing, image_url: url })} />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="admin-btn admin-btn-primary"><Save size={16} /> Kaydet</button>
            <button onClick={() => setEditing(null)} className="admin-btn admin-btn-secondary"><X size={16} /> İptal</button>
          </div>
        </div>
      )}

      {/* Tablo */}
      <div className="admin-card overflow-x-auto">
        {loading ? <p className="text-gray-400">Yükleniyor...</p> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Görsel</th>
                <th>Başlık</th>
                <th>Alt Başlık</th>
                <th>Sıra</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.image_url && <img src={item.image_url} alt="" className="w-20 h-12 object-cover rounded" />}</td>
                  <td className="font-semibold">{item.title}</td>
                  <td className="text-gray-500 text-sm">{item.subtitle}</td>
                  <td>{item.sort_order}</td>
                  <td><span className={`admin-badge ${item.is_active ? 'admin-badge-green' : 'admin-badge-red'}`}>{item.is_active ? 'Aktif' : 'Pasif'}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(item)} className="admin-btn admin-btn-secondary text-xs"><Pencil size={14} /></button>
                      <button onClick={() => remove(item.id)} className="admin-btn admin-btn-danger text-xs"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
