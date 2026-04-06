import './globals.css'
import { Poppins, Open_Sans } from 'next/font/google'
import { getSiteSettings } from '@/lib/settings'

export const revalidate = 60

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html lang="tr">
      <head>
        {settings.favicon_url && <link rel="icon" href={settings.favicon_url} />}
        {settings.google_verification && <meta name="google-site-verification" content={settings.google_verification} />}
        {settings.yandex_verification && <meta name="yandex-verification" content={settings.yandex_verification} />}
        {settings.bing_verification && <meta name="msvalidate.01" content={settings.bing_verification} />}
    <meta name="yandex-verification" content="6e24b76a46e213a6" />
      </head>
      <body className={`${poppins.variable} ${openSans.variable}`}>{children}</body>
    </html>
  )
}
