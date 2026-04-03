'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminKampanyalarPage() {
  return (
    <AdminCrudPage
      table="campaigns"
      title="Kampanya / Banner Yönetimi"
      fields={[
        { key: 'title', label: 'Başlık', type: 'text', required: true },
        { key: 'description', label: 'Açıklama', type: 'textarea' },
        { key: 'image_url', label: 'Görsel', type: 'image' },
        { key: 'button_text', label: 'Buton Yazısı', type: 'text', placeholder: 'Detaylı Bilgi' },
        { key: 'button_link', label: 'Buton Linki', type: 'text', placeholder: '/teklif' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ title: '', description: '', image_url: '', button_text: '', button_link: '', sort_order: 0, is_active: true }}
    />
  )
}
