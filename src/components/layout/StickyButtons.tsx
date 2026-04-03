import { Phone } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.287 0-4.405-.744-6.122-2.003l-.348-.262-3.278 1.098 1.098-3.278-.262-.348A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
    </svg>
  )
}

export default async function StickyButtons() {
  const supabase = createServerSupabaseClient()
  const { data: rows } = await supabase.from('site_settings').select('key, value').in('key', ['phone', 'whatsapp'])
  const s: Record<string, string> = {}
  rows?.forEach(r => { s[r.key] = r.value || '' })

  const phone = s.phone || ''
  const wa = s.whatsapp || ''

  return (
    <>
      {/* Desktop: Sağ alt köşe */}
      <div className="hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-50">
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110" aria-label="WhatsApp">
          <WhatsAppIcon size={26} />
        </a>
        <a href={`tel:${phone}`}
          className="bg-accent-500 hover:bg-accent-600 text-primary-800 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110" aria-label="Ara">
          <Phone size={26} />
        </a>
      </div>

      {/* Mobil: Alt yapışkan bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex">
        <a href={`tel:${phone}`} className="flex-1 bg-accent-500 text-primary-800 font-bold py-3.5 flex items-center justify-center gap-2 text-sm">
          <Phone size={20} /> Hemen Ara
        </a>
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer"
          className="flex-1 bg-green-500 text-white font-bold py-3.5 flex items-center justify-center gap-2 text-sm">
          <WhatsAppIcon size={20} /> WhatsApp
        </a>
      </div>
    </>
  )
}
