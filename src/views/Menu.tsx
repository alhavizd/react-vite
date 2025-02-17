import {useState} from 'react'
import {useOutlet} from '@/contexts/OutletContext'
import Icon from '@mdi/react'
import {mdiMenu} from '@mdi/js'
import {useQuery} from '@tanstack/react-query'
import {getList} from '@/services/product'
import SidebarMenu from '@/components/sidebar'
import Products from '@/components/product/products'
import {ProductsResponse} from '@/types/product'
import {getRemark} from '@/utils/setting'

function Menu() {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [isList, setIsList] = useState(true)
  const {outletDetail} = useOutlet()
  const [paramsProduct, setParamsProduct] = useState<Record<string, any>>({})

  const {
    data: products,
    isLoading,
    isError
  } = useQuery<ProductsResponse>({
    queryKey: ['products', paramsProduct],
    queryFn: () => getList(paramsProduct)
  })

  console.log(products, getRemark())

  return (
    <>
      <main className="_content">
        <div className="_content__wrap">
          <div className="_fill-height">
            <header className="_toolbar _toolbar-flat _toolbar-fixed" style={{marginTop: '0px', transform: 'translateY(0px)', left: '0px', right: '0px'}}>
              <div className="_toolbar-content px-0">
                <div className="container py-0">
                  <div className="row">
                    <div className="col-sm-6 col-md-4 offset-sm-3 offset-md-4 col-12">
                      <div className="d-flex align-center">
                        <button className="btn mr-2 btn-icon" onClick={() => setOpenSidebar(true)}>
                          <Icon path={mdiMenu} size={1} />
                        </button>
                        <div className="store-name-text">{outletDetail?.name}</div>
                        <div className="spacer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <SidebarMenu open={openSidebar} setOpen={setOpenSidebar} />
            <div className="container pt-0">
              <div className="row">
                <div className="pt-0 col-sm-6 col-md-4 offset-sm-3 offset-md-4 col-12">
                  {/* {products?.data.map((item) => (
                    <Products isList={isList} sectionId={`list-product- + ${item.product_group_id}`} title={item.product_group_name} items={item.items} click-detail={detailProduct} />
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Menu
