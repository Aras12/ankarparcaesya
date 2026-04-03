import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { BlogPost } from '@/lib/types'
import { getImageUrl } from '@/lib/constants'

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-700 mb-3">
            Blog
          </h2>
          <p className="text-gray-500">Nakliye ve taşımacılık hakkında faydalı bilgiler</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={getImageUrl(post.image_url)}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                  <Calendar size={12} />
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString('tr-TR')
                    : new Date(post.created_at).toLocaleDateString('tr-TR')}
                </div>
                <h3 className="font-heading font-bold text-base text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-block border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Tüm Yazıları Gör →
          </Link>
        </div>
      </div>
    </section>
  )
}
