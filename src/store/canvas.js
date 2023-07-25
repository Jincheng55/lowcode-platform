import { useRef } from 'react'
import { generateUUID } from '../utils/uuid'

const defaultCanvas = {
  style: {
    width: 320,
    height: 568,
    position: 'relative',
    border: '1px solid',
    backgroundColor: '#FFFFFF',
    backgroundImage: '',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'content-box',
    overflow: 'hidden',
  },
  cmps: [],
}

class Canvas {
  constructor(_canvas = defaultCanvas) {
    this.canvas = _canvas
    this.subs = []
    this.selectedIndex = null
  }
  getCanvas = () => {
    return { ...this.canvas }
  }
  setCanvas = style => {
    this.canvas.style = { ...this.canvas.style, ...style }
    this.updateComponents()
  }
  getCmps = () => {
    return [...this.canvas.cmps]
  }
  addCmps = cmp => {
    const component = { key: generateUUID(), ...cmp }
    this.canvas.cmps.push(component)
    this.setSelectedIndex(this.canvas.cmps.length - 1)
    // this.updateComponents()
  }

  setSelectedIndex = index => {
    this.selectedIndex = index
    this.updateComponents()
  }

  setSelectedCmp = (style, content) => {
    let component = this.canvas.cmps[this.selectedIndex]
    if (!component) return
    component.style = { ...component.style, ...style }
    if (content) component.content = content
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
