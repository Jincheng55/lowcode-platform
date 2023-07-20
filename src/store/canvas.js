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
    this.subs = []
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
  addCmps = cmp => {
    const component = { key: generateUUID(), ...cmp }
    this.canvas.cmps.push(component)
    this.updateComponents()
  }
  updateComponents = () => {
    this.subs.forEach(s => s())
  }
  subscribe = fn => {
    this.subs.push(fn)
    return () => {
      this.unSubscribe(fn)
    }
  }
  unSubscribe = fn => {
    this.subs = this.subs.filter(item => item !== fn)
  }
}

export const useCanvas = () => {
  const canvasRef = useRef()
  if (!canvasRef.current) {
    canvasRef.current = new Canvas()
  }
  return canvasRef.current
}
