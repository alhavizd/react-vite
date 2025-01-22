import _axios from '@/request' // Import Axios yang sudah dikonfigurasi
import {getBaseUrl} from '@/utils/endpoint'

export function login(params = {}) {
  return _axios.get(getBaseUrl() + '/system/login')
}
