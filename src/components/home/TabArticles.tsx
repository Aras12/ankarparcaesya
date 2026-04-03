'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TabArticle } from '@/lib/types'
import { getImageUrl } from '@/lib/constants'

export default function TabArticles({ articles }: { articles: TabArticle[] }) {
  const [activeTab, setActiveTab] = useState(0)

  if (!articles.length) return null

  const active = articles[activeTab]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {articles.map((article, i) => (
            <button
              key={article.id}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                i === activeTab
                  ? 'tab-active shadow-lg'
                  : 'tab-inactive'
              }`}
            >
              {article.tab_title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {active.image_url && (
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={getImageUrl(active.image_url)}
                alt={active.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h2 className="font-heading font-bold text-xl md:text-2xl text-primary-600 mb-4">
              {active.title}
            </h2>
            <div
              className="content-html text-gray-600"
              dangerouslySetInnerHTML={{ __html: active.content || '' }}
            />
            <Link
              href={`/makaleler/${active.slug}`}
              className="inline-block mt-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all"
            >
              Devamını Oku →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
