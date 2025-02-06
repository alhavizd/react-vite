import _axios from '@/request' // Import Axios yang sudah dikonfigurasi
import {getBaseUrl} from '@/utils/endpoint'
import {Outlet, ParamsOutlet} from '@/types/outlet'

export function getStore(): Promise<any> {
  return _axios.get(getBaseUrl() + '/store')
}

export function getList(params: ParamsOutlet): Promise<Outlet[]> {
  return _axios.get(getBaseUrl() + '/outlet', {params: params})
}
