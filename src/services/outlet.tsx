import _axios from '@/request' // Import Axios yang sudah dikonfigurasi
import {getBaseUrl} from '@/utils/endpoint'
import {OutletsResponse, ParamsOutlet} from '@/types/outlet'

export function getStore(): Promise<any> {
  return _axios.get(getBaseUrl() + '/store').then((res) => res.data)
}

export function getList(params?: ParamsOutlet): Promise<OutletsResponse> {
  return _axios.get(getBaseUrl() + '/outlet', {params}).then((res) => res.data)
}

export function getDetail(id: number, params = {}) {
  return _axios.get(getBaseUrl() + '/outlet/' + id, {params: params}).then((res) => res.data)
}
