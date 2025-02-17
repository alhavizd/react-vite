export interface ParamsOutlet {
  origin_lat: number | null
  origin_lon: number | null
  [key: string]: any // Jika ada parameter tambahan yang tidak diketahui
}

export interface Outlet {
  id: number // ID unik outlet
  name: string // Nama outlet
  address: string // Alamat outlet
  latitude: number // Koordinat latitude
  longitude: number // Koordinat longitude
  phone?: string // Nomor telepon (opsional)
  opening_hours?: string // Jam operasional (opsional)
  [key: string]: any // Jika ada field tambahan yang belum diketahui
}

export interface OutletsResponse {
  data: Outlet[]
}
