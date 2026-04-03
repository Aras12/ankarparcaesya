'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import RichEditor from '@/components/admin/RichEditor'

export default function AdminBlogPage() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const load = useCallback(async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    setItems(data || []); setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleEdit = (item: any) => setEditing(JSON.parse(JSON.stringify(item)))

  const save = async () => {
    if (!editing || saving) return
    setSaving(true)
    const p: any = { ...editing }
    delete p.created_at; delete p.updated_at
    // Yayınlanıyorsa tarih ata
    if (p.is_published && !p.published_at) p.published_at = new Date().toISOString()
    if (!p.is_published) p.published_at = null

    try {
      if (editing.id) {
        const { error } = await supabase.from('blog_posts').update(p).eq('id', editing.id)
        if (error) { alert('Hata: ' + error.message); setSaving(false); return }
      } else {
        delete p.id
        const { error } = await supabase.from('blog_posts').insert([p])
        if (error) { alert('Hata: ' + error.message); setSaving(false); return }
      }
      setEditing(null); await load()
    } catch { alert('Beklenmeyen hata') }
    setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await supabase.from('blog_posts').delete().eq('id', id); load()
  }

  const u = (key: string, val: any) => setEditing((p: any) => p ? { ...p, [key]: val } : null)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Blog Yönetimi</h1>
        <button onClick={() => setEditing({ title: '', slug: '', meta_description: '', excerpt: '', content: '', image_url: '', is_published: false })} className="admin-btn admin-btn-primary"><Plus size={18} /> Yeni Yazı</button>
      </div>

      {editing && (
        <div className="admin-card mb-6 border-2 border-blue-200">
          <h2 className="font-bold text-lg mb-4 text-blue-700">{editing.id ? '✏️ Düzenle' : '➕ Yeni Blog Yazısı'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Yazı Başlığı *</label><input className="admin-input" value={editing.title || ''} onChange={(e) => u('title', e.target.value)} /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL) *</label><input className="admin-input" value={editing.slug || ''} onChange={(e) => u('slug', e.target.value)} placeholder="yazi-basligi" /></div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-sm text-blue-700 mb-3">🔍 SEO Ayarları</h3>
            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Meta Açıklama</label><textarea className="admin-input" rows={2} value={editing.meta_description || ''} onChange={(e) => u('meta_description', e.target.value)} /></div>
          </div>
          <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1">Özet (Listede görünür)</label><textarea className="admin-input" rows={2} value={editing.excerpt || ''} onChange={(e) => u('excerpt', e.target.value)} /></div>
          <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1">İçerik</label><RichEditor value={editing.content || ''} onChange={(html) => u('content', html)} rows={12} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Kapak Görseli</label><ImageUpload value={editing.image_url || ''} onChange={(url) => u('image_url', url)} /></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={editing.is_published ?? false} onChange={(e) => u('is_published', e.target.checked)} id="pub" className="w-4 h-4" /><label htmlFor="pub" className="text-sm font-semibold">Yayınla</label></div>
          </div>
          <div className="flex gap-2 pt-2 border-t">
            <button onClick={save} disabled={saving} className="admin-btn admin-btn-primary disabled:opacity-50"><Save size={16} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
            <button onClick={() => setEditing(null)} className="admin-btn admin-btn-secondary"><X size={16} /> İptal</button>
          </div>
        </div>
      )}

      <div className="admin-card overflow-x-auto">
        {loading ? <p className="text-gray-400 py-4">Yükleniyor...</p> : items.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Henüz blog yazısı yok.</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Başlık</th><th>Slug</th><th>Durum</th><th>Tarih</th><th>İşlem</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="font-semibold">{item.title}</td>
                  <td className="text-gray-400 text-xs font-mono">{item.slug}</td>
                  <td><span className={`admin-badge ${item.is_published ? 'admin-badge-green' : 'admin-badge-yellow'}`}>{item.is_published ? 'Yayında' : 'Taslak'}</span></td>
                  <td className="text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString('tr-TR')}</td>
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
