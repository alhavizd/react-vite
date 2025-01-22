import i18n from 'i18next'
import {getDomain} from '@/utils/domain'

export function getBaseUrl(): string {
  let selectedlocale: string = i18n.language || import.meta.env.VITE_I18N_LOCALE
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
