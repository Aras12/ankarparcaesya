import { getSiteSettings } from '@/lib/settings'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StickyButtons from '@/components/layout/StickyButtons'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <div className="site-wrapper min-h-screen flex flex-col">
      <Header
        logoUrl={settings.logo_url}
        phone={settings.phone}
        topbarText={settings.topbar_text}
        topbarActive={settings.topbar_active !== 'false'}
      />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyButtons />
    </div>
  )
}
