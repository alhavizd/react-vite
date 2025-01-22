import _axios from '@/request.tsx' // Import Axios yang sudah dikonfigurasi
import {getBaseUrl} from '@/utils/endpoint.tsx'

export function login(): Promise<any> {
  return _axios.get(getBaseUrl() + '/system/login')
}
