'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminTabMakalelerPage() {
  return (
    <AdminCrudPage
      table="tab_articles"
      title="Tab Makaleler"
      fields={[
        { key: 'tab_title', label: 'Tab Başlığı', type: 'text', required: true },
        { key: 'slug', label: 'Slug (URL)', type: 'text', required: true },
        { key: 'title', label: 'SEO Başlık', type: 'text' },
        { key: 'meta_description', label: 'Meta Açıklama', type: 'textarea' },
        { key: 'content', label: 'İçerik (HTML)', type: 'html' },
        { key: 'image_url', label: 'Görsel', type: 'image' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ tab_title: '', slug: '', title: '', meta_description: '', content: '', image_url: '', sort_order: 0, is_active: true }}
    />
  )
}
