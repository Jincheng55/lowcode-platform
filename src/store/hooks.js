import { useContext } from 'react'
import { CanvasContext } from './context'

export const useCanvasContextData = () => {
  const canvas = useContext(CanvasContext)
  return canvas.getCanvas()
}

export const useCanvasCmps = () => {
  const canvas = useContext(CanvasContext)
  const cmps = canvas.getCmps()
  return cmps
}

export const useAddCanvasCmps = () => {
  const canvas = useContext(CanvasContext)
  return canvas.addCmps
}

// export const useSubscribeUpdate = fn => {
//   const canvas = useContext(CanvasContext)
//   const unsub = canvas.subscribe(fn)
//   return unsub
// }
