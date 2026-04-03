'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Faq { id: string; question: string; answer: string }

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<string | null>(null)
  if (!faqs.length) return null

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-700 mb-8 text-center">Sıkça Sorulan Sorular</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-heading font-semibold text-sm md:text-base text-gray-800 pr-4">{faq.question}</span>
                <ChevronDown size={20} className={`text-primary-600 flex-shrink-0 transition-transform ${open === faq.id ? 'rotate-180' : ''}`} />
              </button>
              {open === faq.id && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question', name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
      })}} />
    </section>
  )
}
