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
    this.selectedIndex = new Set()
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

  setSelectedIndex = (index, isAdd) => {
    if (index === null) {
      this.selectedIndex.clear()
      this.updateComponents()
      return
    }
    // 当isAdd为true时不清楚，只做添加
    if (!isAdd) this.selectedIndex.clear()
    this.selectedIndex.add(index)
    this.updateComponents()
  }
  getSelectedIndex = () => {
    return Array.from(this.selectedIndex)
  }

  setSelectedCmp = (style, content, donotAdd) => {
    const indexArr = this.getSelectedIndex()
    for (const index of indexArr) {
      let component = this.canvas.cmps[index]
      if (!component) return
      component.style = { ...component.style, ...style }
      if (content) component.content = content
      this.updateComponents()
      // 当donotAdd为true时，不添加历史记录
      if (!donotAdd) this.addHistory()
    }
  }

  //  此方法仅为了批量处理组件(放大/移动)时运行不一样的style计算逻辑
  patchSetSelectedCmps = style => {
    const indexArr = this.getSelectedIndex()
    for (const index of indexArr) {
      let component = this.canvas.cmps[index]
      if (!component) continue
      const tempStyle = { ...component.style }
      for (const k in style) {
        tempStyle[k] += style[k]
      }
      component.style = tempStyle
    }
    this.updateComponents()
  }

  setTemplate = template => {
    this.canvas.style = { ...template.canvas.style }
    this.canvas.cmps = [...template.canvas.cmps, ...this.canvas.cmps]
    this.setSelectedIndex(this.canvas.cmps.length - 1)
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
    this.setSelectedIndex(null)
  }

  goForward = () => {
    if (this.historyIndex >= this.history.length - 1) return
    this.canvas = JSON.parse(this.history[++this.historyIndex])
    this.setSelectedIndex(null)
  }
  // todo 渲染可能因为引用没变，index修改没有正确更新试图
  // todo  置顶/底
  moveupCmp = index => {
    if (index >= this.canvas.cmps.length - 1) return
    const newIndex = index + 1
    this.swapCmp(newIndex, index)
    const temp = this.getSelectedIndex()[0]
    this.setSelectedIndex(temp + 1)
  }
  moveDownCmp = index => {
    if (index <= 0) return
    const newIndex = index - 1
    this.swapCmp(newIndex, index)
    const temp = this.getSelectedIndex()[0]
    this.setSelectedIndex(temp - 1)
  }

  swapCmp = (newIndex, index) => {
    const temp = this.canvas.cmps[index]
    this.canvas.cmps[index] = this.canvas.cmps[newIndex]
    this.canvas.cmps[newIndex] = temp
  }

  copyCmps = () => {
    const indexArr = this.getSelectedIndex()
    this.selectedIndex.clear()
    for (const index of indexArr) {
      let cmp = this.canvas.cmps[index]
      let cloneCmp = JSON.parse(JSON.stringify(cmp))
      cloneCmp.style.left += 40
      cloneCmp.style.top += 40
      cloneCmp.key = generateUUID()
      this.canvas.cmps.push(cloneCmp)
      this.selectedIndex.add(this.canvas.cmps.length - 1)
    }
    this.updateComponents()
  }

  deleteCmps = () => {
    this.canvas.cmps = this.canvas.cmps.filter((item, index) => {
      if (this.selectedIndex.has(index)) return null
      return item
    })
    this.setSelectedIndex(null)
  }

  clearCanvas = () => {
    this.canvas = defaultCanvas()
    this.setSelectedIndex(null)
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
