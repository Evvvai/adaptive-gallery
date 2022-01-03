import './Home.scss'
import { FC, Fragment } from 'react'

// Icons
import { IoMdImages } from 'react-icons/io'

// Components
import Gallery from '../gallery/Gallery'
import DropImage from './drop-image/DropImage'

// Custom hooks
import { useGallery } from '../../hooks/store/gallery/useGallery'
import { useGalleryMenu } from '../../hooks/store/gallery/useGalleryMenu'

// Utils

////////////////////////////////////////////////////////////////////////////////////////////////////
const Home: FC = () => {
  const { openGalleryMenu } = useGalleryMenu()
  const { photos } = useGallery()

  return (
    <section className="home">
      <div className="home-header">
        <h1 className="home-header__title">Gallery</h1>
        <hr className="home-header__hr" />
      </div>
      {photos.length === 0 ? (
        <div className="home-empty">
          <IoMdImages className="home-empty__icon" onClick={(e) => openGalleryMenu()} />
          <h1 className="home-empty__title">No photos uploaded</h1>
        </div>
      ) : (
        <Fragment>
          <Gallery photos={JSON.parse(JSON.stringify(photos))} margin={1} rowHeight={200} />
          <DropImage /> {/* Funny thing ♿ */}
        </Fragment>
      )}
    </section>
  )
}

export default Home
