import React from 'react'
import styles from '../ImgSide/imgside.less'
import { Card } from 'antd'
import { useCanvasContextData } from '../../store/hooks'
const graph = {
  type: "div",
  content: '',
  style: {
    color: '#000000',
    position: 'absolute',
    backgroundColor: '#c51010',
    left: 0,
    top: 0,
    width: 100,
    height: 50,
    fontSize: 20,
    borderRadius: '0px'
  }
}
const GraphSide = () => {
  const onDragStart = (e) => {
    e.stopPropagation()
    e.dataTransfer.setData('cmp', JSON.stringify(graph))
  }
  const canvas = useCanvasContextData()
  const addGraph = () => {
    canvas.addCmps(graph)
  }
  return (
    <div className={styles.details}>
      <Card onClick={addGraph} draggable onDragStart={e => onDragStart(e)} >
        添加图形
      </Card>
    </div>
  )
}

export default GraphSide