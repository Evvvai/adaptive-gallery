import './Header.scss'
import { FC, useState, forwardRef, createRef, Fragment } from 'react'

// Icons
import { ReactComponent as FooterWaveIcon } from '../../assets/icon/FooterWave.svg'
import { BiImages } from 'react-icons/bi'
import { GiAbstract047 } from 'react-icons/gi'

// Components
import Modal from '../UI/modal/Modal'
import ImageMenu from '../UI/modal/image-menu/ImageMenu'
import ThemeSelector from '../theme-selector/ThemeSelector'

// Custom hooks
import { useGalleryMenu } from '../../hooks/store/gallery/useGalleryMenu'

// Utils
import { Portal } from '../../utils/portal'

///////////////////////////////////////////////////////////////////////////////////////////
const Header: FC = () => {
  const { isGalleryMenu, openGalleryMenu, closeGalleryMenu } = useGalleryMenu()
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false)

  const handleClickMenuOpen = (isOpen: boolean) => (isOpen ? openGalleryMenu() : closeGalleryMenu())
  const handleClickThemeOpen = () => setIsThemeOpen(!isThemeOpen)

  const themeIconRef = createRef()
  const ThemeSelectorSection = forwardRef((props, ref: any) => (
    <div className="header-item__icon" ref={ref} onClick={handleClickThemeOpen}>
      <GiAbstract047 />
    </div>
  ))

  return (
    <header className="header">
      <nav className="header-content">
        <ul className="header-nav">
          <li className="header-item logo">
            <ThemeSelectorSection ref={themeIconRef} />
            <span className="header-item__title">Gallery</span>
            {isThemeOpen && <ThemeSelector buttonRef={themeIconRef} setOpen={setIsThemeOpen} />}
          </li>
          <li onClick={() => handleClickMenuOpen(true)} className="header-item">
            <span className="header-item__title">Add image</span>
            <BiImages className="header-item__icon" />
            <Portal>
              <Modal isOpen={isGalleryMenu} setOpen={handleClickMenuOpen}>
                <ImageMenu />
              </Modal>
            </Portal>
          </li>
        </ul>
      </nav>
      <FooterWaveIcon className="header-wave" />
    </header>
  )
}

export default Header
