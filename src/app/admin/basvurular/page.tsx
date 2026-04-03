'use client'

import { useEffect, useState } from 'react'
import { Eye, Trash2, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { QuoteRequest } from '@/lib/types'

export default function AdminBasvurularPage() {
  const [items, setItems] = useState<QuoteRequest[]>([])
  const [selected, setSelected] = useState<QuoteRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const load = async () => {
    const { data } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false })
    setItems(data || []); setLoading(false)
  }

  useEffect(() => { load() }, [])

  const markRead = async (id: string) => {
    await supabase.from('quote_requests').update({ is_read: true }).eq('id', id)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await supabase.from('quote_requests').delete().eq('id', id)
    setSelected(null); load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Teklif Başvuruları</h1>

      {selected && (
        <div className="admin-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Başvuru Detayı</h2>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold text-gray-500">Ad Soyad:</span> <span className="text-gray-800">{selected.name}</span></div>
            <div><span className="font-semibold text-gray-500">Telefon:</span> <a href={`tel:${selected.phone}`} className="text-blue-600">{selected.phone}</a></div>
            <div><span className="font-semibold text-gray-500">E-posta:</span> <span className="text-gray-800">{selected.email || '-'}</span></div>
            <div><span className="font-semibold text-gray-500">Hizmet:</span> <span className="text-gray-800">{selected.service_type || '-'}</span></div>
            <div><span className="font-semibold text-gray-500">Nereden:</span> <span className="text-gray-800">{selected.from_district} - {selected.from_address || '-'}</span></div>
            <div><span className="font-semibold text-gray-500">Nereye:</span> <span className="text-gray-800">{selected.to_district} - {selected.to_address || '-'}</span></div>
            <div><span className="font-semibold text-gray-500">Tarih:</span> <span className="text-gray-800">{selected.preferred_date || '-'}</span></div>
            <div><span className="font-semibold text-gray-500">Başvuru:</span> <span className="text-gray-800">{new Date(selected.created_at).toLocaleString('tr-TR')}</span></div>
            <div className="md:col-span-2"><span className="font-semibold text-gray-500">Notlar:</span><p className="text-gray-800 mt-1">{selected.notes || '-'}</p></div>
          </div>
          <div className="flex gap-2 mt-4">
            {!selected.is_read && <button onClick={() => { markRead(selected.id); setSelected({...selected, is_read: true}) }} className="admin-btn admin-btn-primary"><Check size={16} /> Okundu</button>}
            <button onClick={() => remove(selected.id)} className="admin-btn admin-btn-danger"><Trash2 size={16} /> Sil</button>
          </div>
        </div>
      )}

      <div className="admin-card overflow-x-auto">
        {loading ? <p className="text-gray-400">Yükleniyor...</p> : items.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Henüz başvuru yok.</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Ad Soyad</th><th>Telefon</th><th>Hizmet</th><th>İlçe</th><th>Tarih</th><th>Durum</th><th>İşlem</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={!item.is_read ? 'bg-blue-50/50' : ''}>
                  <td className="font-semibold">{item.name}</td>
                  <td><a href={`tel:${item.phone}`} className="text-blue-600">{item.phone}</a></td>
                  <td className="text-sm">{item.service_type || '-'}</td>
                  <td className="text-sm">{item.from_district || '-'}</td>
                  <td className="text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString('tr-TR')}</td>
                  <td><span className={`admin-badge ${item.is_read ? 'admin-badge-green' : 'admin-badge-blue'}`}>{item.is_read ? 'Okundu' : 'Yeni'}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelected(item); if (!item.is_read) markRead(item.id) }} className="admin-btn admin-btn-secondary text-xs"><Eye size={14} /></button>
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
