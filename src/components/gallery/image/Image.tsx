import './Image.scss'

import { FC } from 'react'

// Components

// Interface
interface Props {
  margin?: string
  display?: string
  photo: Photo
}

interface Photo {
  key?: string
  src: string
  width: number
  height: number
  alt?: string
  title?: string
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const Image: FC<Props> = (props) => {
  const imgStyle = { margin: props.margin || '2px', display: props.display || 'block' }

  return <img style={imgStyle} {...props.photo} />
}

export default Image
