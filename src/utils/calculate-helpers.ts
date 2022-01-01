import { Photo } from '@types'

// Round
export const round = (value: number, decimals: number): number => {
  return Number(value.toFixed(decimals)) || 2
}

// Find ideal node search
interface FindIdealNodeSearch {
  rowHeight: number
  rowWidth: number
}
export const findIdealNodeSearch = ({ rowHeight, rowWidth }: FindIdealNodeSearch): number => {
  const rowAR = rowWidth / rowHeight
  return round(rowAR / 1.5, 0) + 2
}

// Ratio
interface Ratio {
  width: number
  height: number
}
export const ratio = ({ width, height }: Ratio): number => round(width / height, 2)

// Get common height
interface GetCommonHeight {
  row: Photo[]
  rowWidth: number
  margin: number
}
export const getCommonHeight = ({ row, rowWidth, margin }: GetCommonHeight): number => {
  const width = rowWidth - row.length * (margin * 2)
  const totalAspectRatio = row.reduce((acc: any, photo: any) => acc + ratio(photo), 0)
  return width / totalAspectRatio
}

// Calculate the cost of breaking at this node (edge weight)
interface Cost {
  photos: Array<any>
  i: number
  j: number
  rowWidth: number
  rowHeight: number
  margin: number
}
export const cost = ({ photos, i, j, rowWidth, rowHeight, margin }: Cost): number => {
  const row = photos.slice(i, j)
  const commonHeight = getCommonHeight({ row, rowWidth, margin })
  return Math.pow(Math.abs(commonHeight - rowHeight), 2)
}
