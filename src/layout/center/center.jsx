import React from 'react'
import styles from './center.less'
import { useCanvasCmps, useCanvasContextData } from '../../store/hooks'
import Cmps from '../../components/cmps/Cmps'
const Center = () => {
  const cmps = useCanvasCmps()
  const canvas = useCanvasContextData()
  const onDrop = (e) => {
    const start = e.dataTransfer.getData('text')?.split(',')
    const diffX = e.pageX - start[0]
    const diffY = e.pageY - start[1]
    const cmp = cmps[canvas.selectedIndex]
    const style = { top: cmp.style.top + diffY, left: cmp.style.left + diffX }
    canvas.setSelectedCmp(style)
  }
  const canvasOnClick = (e) => {
    canvas.setSelectedIndex(null)
  }
  return (
    <div className={styles.center} >
      <div style={canvas.canvas.style} onClick={e => canvasOnClick(e)} onDrop={onDrop} onDragOver={e => e.preventDefault()} >
        {
          cmps.map((cmp, index) => <Cmps key={cmp.key} cmp={cmp} index={index}></Cmps>)
        }
      </div>
    </div>
  )
}

export default Center