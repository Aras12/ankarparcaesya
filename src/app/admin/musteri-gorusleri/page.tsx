'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminMusteriGorusleriPage() {
  return (
    <AdminCrudPage
      table="testimonials"
      title="Müşteri Görüşleri"
      fields={[
        { key: 'name', label: 'Müşteri Adı', type: 'text', required: true, placeholder: 'Ahmet Y.' },
        { key: 'location', label: 'Konum / İlçe', type: 'text', placeholder: 'Çankaya' },
        { key: 'comment', label: 'Yorum', type: 'textarea', required: true },
        { key: 'rating', label: 'Puan (1-5)', type: 'number' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ name: '', location: '', comment: '', rating: 5, sort_order: 0, is_active: true }}
      nameKey="name"
    />
  )
}
