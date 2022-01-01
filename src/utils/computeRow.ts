import { Photo } from '@types'
import { cost, getCommonHeight, round, ratio } from './calculate-helpers'
import { findShortestPath } from './dijkstra'

// Make get neighbors
interface MakeGetNeighbors {
  rowHeight: number
  rowWidth: number
  photos: Photo[]
  limitNodeSearch: number
  margin: number
}

// return function that gets the neighboring nodes of node and returns costs
const makeGetNeighbors =
  ({ rowHeight, rowWidth, photos, limitNodeSearch, margin }: MakeGetNeighbors) =>
  (start: number) => {
    const results: Record<number, number> = {}
    start = +start
    results[+start] = 0
    for (let i = start + 1; i < photos.length + 1; ++i) {
      if (i - start > limitNodeSearch) break
      results[i] = cost({ photos, i: start, j: i, rowWidth, rowHeight, margin })
    }
    return results
  }

// Compute row
interface ComputeRow {
  rowHeight: number
  rowWidth: number
  photos: Photo[]
  limitNodeSearch: number
  margin: number
}

export const computeRow = ({ rowWidth, limitNodeSearch, rowHeight, margin, photos }: ComputeRow) => {
  const getNeighbors = makeGetNeighbors({ rowHeight, rowWidth, photos, limitNodeSearch, margin })
  let path = findShortestPath(getNeighbors, '0', photos.length)
  path = path.map((node: any) => +node)

  // console.log(`time to find the shortest path: ${(+new Date() - t)} ms`);
  for (let i = 1; i < path.length; ++i) {
    const row = photos.slice(path[i - 1], path[i])
    const height = getCommonHeight({ row, rowWidth, margin })
    for (let j = path[i - 1]; j < path[i]; ++j) {
      photos[j].width = round(height * ratio(photos[j]), 1)
      photos[j].height = height
    }
  }

  return photos
}
