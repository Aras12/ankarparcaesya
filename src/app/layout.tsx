import './globals.css'
import { getSiteSettings } from '@/lib/settings'

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html lang="tr">
      <head>
        {settings.favicon_url && <link rel="icon" href={settings.favicon_url} />}
        {settings.google_verification && <meta name="google-site-verification" content={settings.google_verification} />}
        {settings.yandex_verification && <meta name="yandex-verification" content={settings.yandex_verification} />}
        {settings.bing_verification && <meta name="msvalidate.01" content={settings.bing_verification} />}
      </head>
      <body>{children}</body>
    </html>
  )
}
