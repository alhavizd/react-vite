import {getLocale} from '@/utils/locale'

export function getBaseUrl() {
  var selectedlocale = getLocale()
  if (selectedlocale === undefined || selectedlocale == null) {
    selectedlocale = import.meta.env.VITE_I18N_LOCALE
  }
  const url_domain = 'jakartatest'
  const baseURL = '/' + selectedlocale + '/' + url_domain
  return baseURL
}

export function getParameter() {
  const url_store = 'jakartatest'
  let parameter = {}
  if (url_store) {
    parameter = {
      url_id: url_store
    }
  }
  return parameter
}
