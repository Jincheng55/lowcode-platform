import { useRef } from 'react'
import { generateUUID } from '../utils/uuid'

const defaultCanvas = {
  style: {
    width: 320,
    height: 568,
    backgroundColor: 'white',
    backgroundImage: '',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'content-box',
  },
  // cmps: [],
  cmps: [
    {
      key: generateUUID(),
      type: 'text',
      content: '123',
      style: { color: 'red' },
    },
    {
      key: generateUUID(),
      type: 'text',
      content: '471938247u190',
      style: { color: 'red' },
    },
  ],
}

class Canvas {
  constructor(_canvas = defaultCanvas) {
    this.canvas = _canvas
  }
  getCanvas = () => {
    return { ...this.canvas }
  }
  setCanvas = canvas => {
    // this.canvas = Object.assign (this.van)
  }
  getCmps = () => {
    return [...this.canvas.cmps]
  }
}

export const useCanvas = () => {
  const canvasRef = useRef()
  if (!canvasRef.current) {
    canvasRef.current = new Canvas()
  }
  return canvasRef.current
}
