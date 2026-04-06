import { createServerSupabaseClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'

export const getSiteSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase.from('site_settings').select('key, value')
    const settings: Record<string, string> = {}
    data?.forEach((s) => { settings[s.key] = s.value || '' })
    return settings
  },
  ['site-settings'],
  { revalidate: 60 }
)

export const getPageSeo = unstable_cache(
  async (pageKey: string) => {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase.from('page_seo').select('*').eq('page_key', pageKey).single()
    return data
  },
  ['page-seo'],
  { revalidate: 60 }
)
