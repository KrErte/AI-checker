import en from '@/messages/en.json'
import et from '@/messages/et.json'

const messages: Record<string, Record<string, string>> = { en, et }

export type Locale = 'en' | 'et'

export function t(key: string, locale: Locale = 'en'): string {
  return messages[locale]?.[key] || messages['en']?.[key] || key
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/et')) return 'et'
  return 'en'
}
