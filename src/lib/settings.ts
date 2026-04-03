import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('site_settings').select('key, value')
  const settings: Record<string, string> = {}
  data?.forEach((s) => { settings[s.key] = s.value || '' })
  return settings
}

export async function getPageSeo(pageKey: string) {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('page_seo').select('*').eq('page_key', pageKey).single()
  return data
}
