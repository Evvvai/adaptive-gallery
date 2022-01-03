import React, { useLayoutEffect, useRef, FC } from 'react'
import Image from './image/Image'
import { useResizeWindow } from '../../hooks/events/useResizeWindow'
import './Gallery.scss'

// Utils
import { Photo } from '@types'
import { findIdealNodeSearch } from '../../utils/calculate-helpers'
import { computeRow } from '../../utils/computeRow'

// Interface
interface Props {
  photos: Photo[]
  margin: number
  rowHeight: number
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const Gallery: FC<Props> = React.memo(function Gallery({ photos, margin, rowHeight }) {
  const galleryRef = useRef<any>(null)
  const [rowWidth, setRowWidth] = useResizeWindow({ ref: galleryRef, debounce: 250 })

  useLayoutEffect(() => {
    if (galleryRef.current) setRowWidth(galleryRef.current.offsetWidth)
  }, [])

  // skip first render
  if (rowWidth === null) {
    return (
      <div ref={galleryRef} className="gallery">
        <div className="gallery-content" />
      </div>
    )
  }

  const photosAdaptive = computeRow({
    rowWidth,
    rowHeight,
    limitNodeSearch: rowWidth >= 425 ? findIdealNodeSearch({ rowWidth, rowHeight }) : 2,
    margin,
    photos,
  })

  return (
    <div ref={galleryRef} className="gallery">
      <div className="gallery-content">
        {photosAdaptive.map((photo: any, key: number) => {
          return <Image key={photo.url + key + photo?.id} photo={photo} margin={margin + 'px'} />
        })}
      </div>
    </div>
  )
})

export default Gallery
