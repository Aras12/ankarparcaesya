export interface Slider {
  id: string
  title: string
  subtitle: string | null
  image_url: string | null
  button_text: string
  button_link: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface TabArticle {
  id: string
  tab_title: string
  slug: string
  title: string
  meta_description: string | null
  content: string | null
  image_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Region {
  id: string
  name: string
  slug: string
  title: string | null
  meta_description: string | null
  content: string | null
  image_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  slug: string
  title: string | null
  meta_description: string | null
  short_description: string | null
  content: string | null
  icon: string
  image_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  meta_description: string | null
  excerpt: string | null
  content: string | null
  image_url: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface QuoteRequest {
  id: string
  name: string
  phone: string
  email: string | null
  from_address: string | null
  to_address: string | null
  from_district: string | null
  to_district: string | null
  service_type: string | null
  preferred_date: string | null
  notes: string | null
  is_read: boolean
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  phone: string
  email: string | null
  subject: string | null
  message: string | null
  is_read: boolean
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string | null
  updated_at: string
}

export interface HomepageContent {
  id: string
  section_key: string
  title: string | null
  content: string | null
  updated_at: string
}
