import _axios from '@/request' // Import Axios yang sudah dikonfigurasi
import {getBaseUrl} from '@/utils/endpoint'

export function login(): Promise<any> {
  return _axios.get(getBaseUrl() + '/system/login').then((res) => res.data)
}
