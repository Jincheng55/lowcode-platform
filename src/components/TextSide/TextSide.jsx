import React from 'react'
import styles from './textside.less'
import { Card } from 'antd'
import { useAddCanvasCmps } from '../../store/hooks'

const title = {
  type: "h2",
  content: '标题',
  style: {
    color: '#000000',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 50,
    fontSize: 32,
    fontWeight: 'bold',
    whiteSpace: 'pre'
  }
}

const text = {
  type: "text",
  content: '正文',
  style: {
    color: '#000000',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 50,
    fontSize: 14,
    whiteSpace: 'pre'
  }
}
const onTextDragStart = (e) => {
  e.stopPropagation()
  e.dataTransfer.setData('cmp', JSON.stringify(text))
}

const onTitleDragStart = (e) => {
  e.stopPropagation()
  e.dataTransfer.setData('cmp', JSON.stringify(title))
}
const TextSide = () => {
  const addCmp = useAddCanvasCmps()
  return (
    <div className={styles.details}>
      <Card draggable onDragStart={e => onTitleDragStart(e)} onClick={() => addCmp(title)}>
        <h2>标题</h2>
      </Card>
      <Card draggable onDragStart={e => onTextDragStart(e)} onClick={() => addCmp(text)}>
        <p>正文</p>
      </Card>
    </div>
  )
}

export default TextSide