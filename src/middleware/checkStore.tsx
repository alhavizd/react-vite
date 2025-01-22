import axios from 'axios'
import i18n from 'i18next'
import {getDomain, setDomain} from '@/utils/domain'

export async function checkStore(): Promise<void> {
  if (!getDomain()) {
    const isDevelopment: boolean = import.meta.env.VITE_NODE_ENV === 'development'
    const host: string = window.location.hostname
    let url_store: string = 'jakartatest'

    if (isDevelopment) {
      url_store = 'jakartatest'
      return setDomain(url_store)
    }
    if (host.includes('antarinmakan.com') || host.includes('indociti.com')) {
      url_store = host.includes('indociti.com') ? 'jakartatest' : host.split('.')[0] || 'jakartatest'
      return setDomain(url_store)
    }
    if (!host.includes('antarinmakan.com') && !host.includes('indociti.com')) {
      try {
        const hostname: string = window.location.hostname
        const selectedLocale: string = i18n.language || import.meta.env.VITE_I18N_LOCALE
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}${selectedLocale}/hintstore`, {domain: hostname})
        url_store = data.data.url_id
        return setDomain(url_store)
      } catch {
        url_store = 'jakartatest'
        return setDomain(url_store)
      }
    }
    url_store = host.split('.').length > 2 ? host.split('.')[0] : 'jakartatest'
    return setDomain(url_store)
  }
}
