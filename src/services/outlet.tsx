import _axios from '@/request' // Import Axios yang sudah dikonfigurasi
import {getBaseUrl} from '@/utils/endpoint'

export function getStore(): Promise<any> {
  return _axios.get(getBaseUrl() + '/store')
}
