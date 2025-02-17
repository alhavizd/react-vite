import Icon from '@mdi/react'
import {mdiArrowLeft} from '@mdi/js'
import OutletSelection from '@/components/OutletSelection'

interface SidebarMenuProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({open, setOpen}) => {
  return (
    <>
      <div className={`sidebar-overlay ${open ? 'active' : ''}`} />
      <div id="scroll-target" className={`overflow-y-auto frame-sidebar ${open ? 'active' : ''}`} style={{maxHeight: `100vh`}}>
        <div className="sheet-bar">
          <div className="sheet-bar-content">
            <div className="container">
              <div className="row">
                <div className="col col-12">
                  <div className="d-flex align-center">
                    <div className="spacer" />
                    <button type="button" className="mr-2 btn btn-icon" onClick={() => setOpen(false)}>
                      <span className="btn-content">
                        <Icon path={mdiArrowLeft} size={1} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-wrap">
          <div className="mb-4">
            <div className="px-4 mb-4">
              <OutletSelection />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarMenu
