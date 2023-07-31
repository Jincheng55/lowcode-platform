import { useRef } from 'react'
import { generateUUID } from '../utils/uuid'

const defaultCanvas = () => {
  return {
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
      overflowX: 'hidden',
      transformOrigin: '50% 0%',
    },
    cmps: [],
  }
}

class Canvas {
  constructor(_canvas = defaultCanvas()) {
    this.canvas = _canvas
    this.subs = []
    this.selectedIndex = null
    this.history = [JSON.stringify(this.canvas)]
    this.historyIndex = 0
  }
  getCanvas = () => {
    return { ...this.canvas }
  }
  setCanvas = style => {
    this.canvas.style = { ...this.canvas.style, ...style }
    this.updateComponents()
    this.addHistory()
  }
  getCmps = () => {
    return [...this.canvas.cmps]
  }
  addCmps = cmp => {
    const component = { ...cmp, key: generateUUID() }
    this.canvas.cmps.push(component)
    this.setSelectedIndex(this.canvas.cmps.length - 1)
    this.addHistory()
  }

  setSelectedIndex = index => {
    this.selectedIndex = index
    this.updateComponents()
  }

  setSelectedCmp = (style, content, donotAdd) => {
    let component = this.canvas.cmps[this.selectedIndex]
    if (!component) return
    component.style = { ...component.style, ...style }
    if (content) component.content = content
    this.updateComponents()
    if (!donotAdd) this.addHistory()
  }

  setTemplate = template => {
    this.canvas.style = { ...template.canvas.style }
    this.canvas.cmps = [...template.canvas.cmps, ...this.canvas.cmps]
    this.selectedIndex = this.canvas.cmps.length - 1
    this.updateComponents()
    this.addHistory()
  }

  addHistory = () => {
    if (this.history.length >= 100) {
      this.history.shift()
      this.historyIndex--
    }
    if (this.historyIndex !== this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1)
    }
    this.history.push(JSON.stringify(this.canvas))
    this.historyIndex++
  }

  goBack = () => {
    if (this.historyIndex <= 0) return
    this.canvas = JSON.parse(this.history[--this.historyIndex])
    this.selectedIndex = null
    this.updateComponents()
  }

  goForward = () => {
    if (this.historyIndex >= this.history.length - 1) return
    this.canvas = JSON.parse(this.history[++this.historyIndex])
    this.selectedIndex = null
    this.updateComponents()
  }

  clearCanvas = () => {
    this.canvas = defaultCanvas()
    this.selectedIndex = null
    this.updateComponents()
    this.addHistory()
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
