import _axios from '@/request' // Import Axios yang sudah dikonfigurasi
import {getBaseUrl} from '@/utils/endpoint'
import {ProductsResponse, ParamsProduct} from '@/types/product'

export function getList(params?: ParamsProduct): Promise<ProductsResponse> {
  return _axios.get(getBaseUrl() + '/product', {params}).then((res) => res.data)
}
