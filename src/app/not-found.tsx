import Link from 'next/link'
import SiteLayout from '@/components/layout/SiteLayout'

export default async function NotFound() {
  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading font-extrabold text-6xl text-primary-600 mb-4">404</h1>
        <h2 className="font-heading font-bold text-2xl text-gray-800 mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-500 mb-8">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <Link href="/" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-3 rounded-lg transition-all">
          Ana Sayfaya Dön
        </Link>
      </div>
    </SiteLayout>
  )
}
