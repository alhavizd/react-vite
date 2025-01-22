import {getLocale} from '@/utils/locale.tsx'
import {getDomain} from '@/utils/domain.tsx'

export function getBaseUrl(): string {
  let selectedlocale: string = getLocale() || import.meta.env.VITE_I18N_LOCALE
  const url_domain: string = getDomain() ?? 'jakartatest'
  const baseURL: string = '/' + selectedlocale + '/' + url_domain
  return baseURL
}

export function getParameter(): {url_id: string} {
  const url_store: string = getDomain() ?? 'jakartatest'
  let parameter: {url_id: string} = {url_id: ''}
  if (url_store) {
    parameter = {
      url_id: url_store
    }
  }
  return parameter
}
