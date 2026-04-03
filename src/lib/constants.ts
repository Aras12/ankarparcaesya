export const SITE_NAME = 'Ankara Parça Eşya Taşıma'
export const SITE_DOMAIN = 'ankarparcaesyanakliye.com.tr'
export const SITE_URL = 'https://ankarparcaesyanakliye.com.tr'

export const SUPABASE_IMG_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/img`

export function getImageUrl(path: string | null): string {
  if (!path) return 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800'
  if (path.startsWith('http')) return path
  return `${SUPABASE_IMG_URL}/${path}`
}

export const iconMap: Record<string, string> = {
  home: '🏠',
  truck: '🚛',
  package: '📦',
  'map-pin': '📍',
  navigation: '🧭',
  warehouse: '🏭',
  box: '📋',
  'arrow-up': '⬆️',
  shield: '🛡️',
  building: '🏢',
}
