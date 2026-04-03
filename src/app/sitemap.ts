import { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'

const SITE_URL = 'https://ankarparcaesyanakliye.com.tr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminClient()

  const [
    { data: services },
    { data: regions },
    { data: tabArticles },
    { data: blogPosts },
  ] = await Promise.all([
    supabase.from('services').select('slug, updated_at').eq('is_active', true),
    supabase.from('regions').select('slug, updated_at').eq('is_active', true),
    supabase.from('tab_articles').select('slug, updated_at').eq('is_active', true),
    supabase.from('blog_posts').select('slug, updated_at').eq('is_published', true),
  ])

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${SITE_URL}/hizmetler`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/bolge`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/teklif`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  const servicePages = (services || []).map((s) => ({
    url: `${SITE_URL}/hizmetler/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const regionPages = (regions || []).map((r) => ({
    url: `${SITE_URL}/bolge/${r.slug}`,
    lastModified: new Date(r.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages = (tabArticles || []).map((a) => ({
    url: `${SITE_URL}/makaleler/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const blogPages = (blogPosts || []).map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...regionPages, ...articlePages, ...blogPages]
}
