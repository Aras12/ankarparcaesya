'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('contact_submissions').insert([form])
    setSuccess(true); setLoading(false)
  }

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"

  if (success) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm text-center border border-gray-100">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="font-heading font-bold text-xl text-primary-700">Mesajınız Alındı!</h2>
        <p className="text-gray-600 mt-2">En kısa sürede dönüş yapacağız.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
      <h2 className="font-heading font-bold text-lg text-primary-700 mb-6">Bize Yazın</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" className={inputClass} placeholder="Ad Soyad *" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
          <input type="tel" className={inputClass} placeholder="Telefon *" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required />
          <input type="email" className={inputClass} placeholder="E-posta" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
          <input type="text" className={inputClass} placeholder="Konu" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} />
        </div>
        <textarea className={inputClass} rows={5} placeholder="Mesajınız" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} />
        <button type="submit" disabled={loading} className="bg-accent-500 hover:bg-accent-600 text-primary-800 font-bold px-8 py-3 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50">
          <Send size={18} /> {loading ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>
    </div>
  )
}
