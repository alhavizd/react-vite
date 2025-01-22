import axios from 'axios'
import {getLocale} from '@/utils/locale'
import {getDomain, setDomain} from '@/utils/domain'

export async function checkStore() {
  if (!getDomain()) {
    const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development'
    const host = window.location.hostname
    let url_store = 'jakartatest'

    if (isDevelopment) url_store = 'jakartatest'
    if (host.includes('antarinmakan.com') || host.includes('indociti.com')) {
      url_store = host.includes('indociti.com') ? 'jakartatest' : host.split('.')[0] || 'jakartatest'
    }
    if (!host.includes('antarinmakan.com') && !host.includes('indociti.com')) {
      try {
        const hostname = window.location.hostname
        const selectedLocale = getLocale() || import.meta.env.VITE_I18N_LOCALE
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}${selectedLocale}/hintstore`, {domain: hostname})
        url_store = data.data.url_id
      } catch {
        url_store = 'jakartatest'
      }
    }
    url_store = host.split('.').length > 2 ? host.split('.')[0] : 'jakartatest'
    return setDomain(url_store)
  }
}
