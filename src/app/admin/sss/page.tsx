'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminSssPage() {
  return (
    <AdminCrudPage
      table="faqs"
      title="Sıkça Sorulan Sorular (SSS)"
      fields={[
        { key: 'question', label: 'Soru', type: 'text', required: true },
        { key: 'answer', label: 'Cevap', type: 'html' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ question: '', answer: '', sort_order: 0, is_active: true }}
      nameKey="question"
    />
  )
}
