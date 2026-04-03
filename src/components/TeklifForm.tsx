'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const districts = [
  'Altındağ','Akyurt','Ayaş','Balâ','Beypazarı','Çamlıdere','Çankaya','Çubuk',
  'Elmadağ','Etimesgut','Evren','Gölbaşı','Güdül','Haymana','Kahramankazan',
  'Kalecik','Keçiören','Kızılcahamam','Mamak','Nallıhan','Polatlı','Pursaklar',
  'Sincan','Şereflikoçhisar','Yenimahalle'
]

const serviceTypes = [
  'Parça Eşya Taşıma','Evden Eve Nakliyat','Panelvan Nakliye','Küçük Nakliye Aracı',
  'Şehirler Arası Nakliye','Şehir İçi Nakliye'
]

export default function TeklifForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', from_address: '', to_address: '',
    from_district: '', to_district: '', service_type: '', preferred_date: '', notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) { setError('Ad ve telefon zorunludur.'); return }
    setLoading(true); setError('')

    const supabase = createClient()
    const { error: err } = await supabase.from('quote_requests').insert([form])

    if (err) { setError('Bir hata oluştu. Lütfen tekrar deneyin.'); setLoading(false); return }
    setSuccess(true); setLoading(false)
  }

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1"

  if (success) {
    return (
      <>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h1 className="font-heading font-extrabold text-2xl text-primary-700 mb-3">Talebiniz Alındı!</h1>
          <p className="text-gray-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
          <a href="/" className="inline-block mt-6 bg-primary-600 text-white font-bold px-6 py-3 rounded-lg">Ana Sayfa</a>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white font-heading font-extrabold text-3xl">Ücretsiz Teklif Alın</h1>
          <p className="text-white/70 mt-2">Formu doldurun, size en uygun fiyat teklifini verelim.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          {error && <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 mb-6 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Ad Soyad *</label>
                <input type="text" className={inputClass} value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Ad Soyad" />
              </div>
              <div>
                <label className={labelClass}>Telefon *</label>
                <input type="tel" className={inputClass} value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="05XX XXX XX XX" />
              </div>
              <div>
                <label className={labelClass}>E-posta</label>
                <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="ornek@email.com" />
              </div>
              <div>
                <label className={labelClass}>Hizmet Türü</label>
                <select className={inputClass} value={form.service_type} onChange={(e) => setForm({...form, service_type: e.target.value})}>
                  <option value="">Seçin</option>
                  {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Nereden (İlçe)</label>
                <select className={inputClass} value={form.from_district} onChange={(e) => setForm({...form, from_district: e.target.value})}>
                  <option value="">Seçin</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Nereye (İlçe)</label>
                <select className={inputClass} value={form.to_district} onChange={(e) => setForm({...form, to_district: e.target.value})}>
                  <option value="">Seçin</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Alınacak Adres</label>
                <input type="text" className={inputClass} value={form.from_address} onChange={(e) => setForm({...form, from_address: e.target.value})} placeholder="Mahalle, sokak..." />
              </div>
              <div>
                <label className={labelClass}>Teslim Adresi</label>
                <input type="text" className={inputClass} value={form.to_address} onChange={(e) => setForm({...form, to_address: e.target.value})} placeholder="Mahalle, sokak..." />
              </div>
              <div>
                <label className={labelClass}>Tercih Edilen Tarih</label>
                <input type="date" className={inputClass} value={form.preferred_date} onChange={(e) => setForm({...form, preferred_date: e.target.value})} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Notlar / Taşınacak Eşyalar</label>
              <textarea className={inputClass} rows={4} value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} placeholder="Taşınacak eşya bilgileri, kat, asansör durumu vs." />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-accent-500 hover:bg-accent-600 text-primary-800 font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <Send size={18} /> {loading ? 'Gönderiliyor...' : 'Teklif İste'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
