'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminHizmetlerPage() {
  return (
    <AdminCrudPage
      table="services"
      title="Hizmet Yönetimi"
      fields={[
        { key: 'name', label: 'Hizmet Adı', type: 'text', required: true },
        { key: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'evden-eve-nakliyat' },
        { key: 'icon', label: 'İkon', type: 'select', options: ['home', 'truck', 'package', 'map-pin', 'navigation', 'warehouse', 'box', 'arrow-up', 'shield', 'building'] },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'title', label: '🔍 Meta Başlık (SEO - isimden bağımsız)', type: 'text', placeholder: 'Ankara Evden Eve Nakliyat | Profesyonel Taşımacılık' },
        { key: 'meta_description', label: '🔍 Meta Açıklama (SEO)', type: 'textarea', placeholder: 'Ankara evden eve nakliyat hizmeti...' },
        { key: 'short_description', label: 'Kısa Açıklama (Kartlarda görünür)', type: 'textarea', placeholder: 'Evinizi komple taşıyoruz...' },
        { key: 'content', label: 'Sayfa İçeriği (HTML)', type: 'html' },
        { key: 'image_url', label: 'Görsel', type: 'image' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ name: '', slug: '', title: '', meta_description: '', short_description: '', content: '', icon: 'truck', image_url: '', sort_order: 0, is_active: true }}
    />
  )
}
