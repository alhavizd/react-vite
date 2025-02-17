export interface ParamsProduct {
  page: number
  per_page: number
  search_column?: string
  search_operator?: string
  search_text?: string
  show_collections?: boolean
  collections?: string[]
  sort_column?: string
  sort_type?: string
  remark?: string
}

export interface Product {
  id: number // ID unik outlet
  name: string // Nama outlet
  [key: string]: any // Jika ada field tambahan yang belum diketahui
}

export interface ProductsResponse {
  data: Product[]
}
