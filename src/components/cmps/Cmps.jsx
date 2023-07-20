import React from 'react'
import { useCanvasContextData } from '../../store/hooks'
import styles from './cmps.less'
const Cmp = ({ cmp, index }) => {
  const canvas = useCanvasContextData()
  const onClick = () => {
    canvas.setSelectedIndex(index)
  }
  const onDragStart = (e) => {
    onClick()
    e.dataTransfer.setData('text', `${e.pageX},${e.pageY}`)
  }
  return (
    <div draggable onDragStart={onDragStart} onClick={onClick}>
      <div style={cmp.style}>{cmp.content}</div>
      {
        canvas.selectedIndex === index && <div className={styles.decoration} style={{ width: cmp.style.width, height: cmp.style.height, left: cmp.style.left - 2, top: cmp.style.top - 2 }}></div>
      }
    </div>
  )
}

export default Cmp