'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminGaleriPage() {
  return (
    <AdminCrudPage
      table="gallery"
      title="Galeri Yönetimi"
      fields={[
        { key: 'title', label: 'Başlık', type: 'text', placeholder: 'Nakliye görseli' },
        { key: 'alt_text', label: 'Alt Metin (SEO)', type: 'text', placeholder: 'Ankara parça eşya taşıma' },
        { key: 'image_url', label: 'Görsel', type: 'image' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ title: '', alt_text: '', image_url: '', sort_order: 0, is_active: true }}
    />
  )
}
