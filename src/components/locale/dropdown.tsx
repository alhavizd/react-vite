import React, {useState, useRef, useEffect} from 'react'
import imgid from './image/id.png'
import imgen from './image/en.png'
import './Dropdown.css'

interface Option {
  code: string // Kode bahasa (misalnya 'id', 'en')
  name: string // Nama bahasa (misalnya 'Indonesia', 'English')
}

interface DropdownProps {
  options: Option[] // Daftar opsi lokal
  onSelect: (option: Option) => void // Fungsi callback saat opsi dipilih
  selectedCode?: string // Kode bahasa yang dipilih (default)
}

const Dropdown: React.FC<DropdownProps> = ({options, onSelect, selectedCode}) => {
  const [isOpen, setIsOpen] = useState(false) // State untuk membuka/menutup dropdown
  const [selectedOption, setSelectedOption] = useState<Option | null>(null) // Opsi yang dipilih
  const dropdownRef = useRef<HTMLDivElement>(null) // Referensi ke elemen dropdown

  // Set default selected option berdasarkan selectedCode
  useEffect(() => {
    const defaultOption = options.find((option) => option.code === selectedCode)
    if (defaultOption) {
      setSelectedOption(defaultOption)
    } else {
      setSelectedOption(options[0]) // Default ke opsi pertama jika selectedCode tidak cocok
    }
  }, [selectedCode, options])

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // Handle selection
  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSelect(option) // Callback ke parent
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      {/* Button Dropdown */}
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedOption && (
          <div className="dropdown-selected">
            <img src={selectedOption.code === 'id' ? imgid : imgen} alt={selectedOption.name} className="dropdown-flag" />
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((option) => (
          <div key={option.code} className="dropdown-item" onClick={() => handleSelect(option)}>
            <img src={option.code === 'id' ? imgid : imgen} alt={option.name} className="dropdown-flag" />
            <span className="dropdown-label">{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
