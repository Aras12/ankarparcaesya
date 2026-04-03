import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getPageSeo, getSiteSettings } from '@/lib/settings'
import SiteLayout from '@/components/layout/SiteLayout'
import HeroSlider from '@/components/home/HeroSlider'
import HeroArticle from '@/components/home/HeroArticle'
import TabArticles from '@/components/home/TabArticles'
import RegionsGrid from '@/components/home/RegionsGrid'
import ServicesGrid from '@/components/home/ServicesGrid'
import GallerySection from '@/components/home/GallerySection'
import CampaignSection from '@/components/home/CampaignSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BlogSection from '@/components/home/BlogSection'
import FaqSection from '@/components/home/FaqSection'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const [seo, settings] = await Promise.all([getPageSeo('homepage'), getSiteSettings()])
  const ogTitle = settings.homepage_og_title || seo?.meta_title || 'Ankara Parça Eşya Taşıma'
  const ogDesc = settings.homepage_og_description || seo?.meta_description || ''
  const ogImg = settings.homepage_og_image || seo?.og_image || settings.og_image || ''
  return {
    title: seo?.meta_title || 'Ankara Parça Eşya Taşıma',
    description: seo?.meta_description || '',
    alternates: { canonical: seo?.canonical_url || 'https://ankarparcaesyanakliye.com.tr' },
    openGraph: {
      title: ogTitle, description: ogDesc,
      images: ogImg ? [{ url: ogImg }] : [], type: 'website', locale: 'tr_TR',
      siteName: settings.site_title || 'Ankara Parça Eşya Taşıma',
    },
  }
}

export default async function HomePage() {
  const supabase = createServerSupabaseClient()
  const settings = await getSiteSettings()

  const [
    { data: sliders }, { data: heroContent }, { data: tabArticles },
    { data: regions }, { data: services }, { data: gallery },
    { data: campaigns }, { data: testimonials }, { data: blogPosts },
    { data: faqs },
  ] = await Promise.all([
    supabase.from('sliders').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('homepage_content').select('*').eq('section_key', 'hero_article').single(),
    supabase.from('tab_articles').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('regions').select('*').eq('is_active', true).order('sort_order').limit(10),
    supabase.from('services').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('gallery').select('*').eq('is_active', true).order('sort_order').limit(6),
    supabase.from('campaigns').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('blog_posts').select('*').eq('is_published', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('faqs').select('*').eq('is_active', true).order('sort_order'),
  ])

  const phone = settings.phone || '0532 XXX XX XX'
  const whatsapp = settings.whatsapp || '905XXXXXXXXX'

  return (
    <SiteLayout>
      <HeroSlider slides={sliders || []} />
      <HeroArticle data={heroContent} />
      <TabArticles articles={tabArticles || []} />
      <ServicesGrid services={services || []} />
      <RegionsGrid regions={regions || []} showAllLink />
      <GallerySection images={gallery || []} />
      <CampaignSection campaigns={campaigns || []} />
      <TestimonialsSection items={testimonials || []} />
      <BlogSection posts={blogPosts || []} />
      <FaqSection faqs={faqs || []} />

      <section className="py-14 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-white mb-4">Hemen Teklif Alın</h2>
          <p className="text-white/80 mb-6 text-lg">Ankara parça eşya taşıma için ücretsiz fiyat teklifi alın.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/teklif" className="bg-accent-500 hover:bg-accent-600 text-primary-800 font-bold px-8 py-3.5 rounded-lg transition-all hover:scale-105">Ücretsiz Teklif Al</a>
            <a href={`tel:+${whatsapp}`} className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-lg border-2 border-white/30 transition-all">{phone}</a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': settings.homepage_schema_type || 'LocalBusiness',
        name: settings.site_title || 'Ankara Parça Eşya Taşıma',
        url: 'https://ankarparcaesyanakliye.com.tr',
        telephone: phone ? `+${phone.replace(/\D/g, '')}` : '', email: settings.email,
        address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressRegion: 'Ankara', addressCountry: 'TR', streetAddress: settings.address || '' },
        areaServed: { '@type': 'City', name: 'Ankara' },
      })}} />
    </SiteLayout>
  )
}
