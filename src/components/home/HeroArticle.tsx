import { HomepageContent } from '@/lib/types'

export default function HeroArticle({ data }: { data: HomepageContent | null }) {
  if (!data) return null

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-primary-700 mb-6">
          {data.title}
        </h1>
        <div
          className="content-html text-gray-600 text-base md:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.content || '' }}
        />
      </div>
    </section>
  )
}
