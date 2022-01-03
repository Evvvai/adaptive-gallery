import './Home.scss'
import { FC } from 'react'

// Icons
import { IoMdImages } from 'react-icons/io'

// Components
import Gallery from '../gallery/Gallery'

// Custom hooks
import { useGallery } from '../../hooks/store/gallery/useGallery'
import { useGalleryMenu } from '../../hooks/store/gallery/useGalleryMenu'

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
        <Gallery photos={JSON.parse(JSON.stringify(photos))} margin={1} rowHeight={200} />
      )}
    </section>
  )
}

export default Home
