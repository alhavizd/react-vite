import React, {useState, useRef, useEffect} from 'react'
import imgid from './image/id.png'
import imgen from './image/en.png'
import './Dropdown.css'

interface Option {
  code: string
  name: string
}

interface DropdownProps {
  options: Option[]
  onSelect: (option: Option) => void
  selectedCode?: string
}

const DropdownLocale: React.FC<DropdownProps> = ({options, onSelect, selectedCode}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownMenuRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({top: 0, left: 0})

  useEffect(() => {
    const defaultOption = options.find((option) => option.code === selectedCode)
    setSelectedOption(defaultOption || options[0])
  }, [selectedCode, options])

  const setPositionMenu = () => {
    if (dropdownRef.current && dropdownMenuRef.current) {
      const buttonRect = dropdownRef.current.getBoundingClientRect()
      const menuRect = dropdownMenuRef.current.getBoundingClientRect()

      let top = buttonRect.bottom
      let left = buttonRect.left

      if (left + menuRect.width > window.innerWidth) {
        left = window.innerWidth - menuRect.width - 10
      }

      if (top + menuRect.height > window.innerHeight + window.scrollY) {
        top = buttonRect.top + window.scrollY - menuRect.height
      }

      setPosition({top, left})
    }
  }

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(setPositionMenu, 10)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    const handleResize = () => {
      if (isOpen) setPositionMenu()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSelect(option)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedOption && (
          <div className="dropdown-selected">
            <img src={selectedOption.code === 'id' ? imgid : imgen} alt={selectedOption.name} className="dropdown-flag" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="dropdown-menu open" style={{top: position.top, left: position.left}} ref={dropdownMenuRef}>
          <div className="dropdown-list">
            {options.map((option) => (
              <div key={option.code} className="dropdown-item" onClick={() => handleSelect(option)}>
                <img src={option.code === 'id' ? imgid : imgen} alt={option.name} className="dropdown-flag" />
                <span className="dropdown-label">{option.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownLocale
