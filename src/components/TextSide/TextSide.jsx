import React from 'react'
import styles from './textside.less'
import { Card } from 'antd'
import { useAddCanvasCmps } from '../../store/hooks'

const h1 = {
  type: "h1",
  content: '标题',
  style: {
    color: '#000000',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 50,
    fontSize: 20
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
    fontSize: 14
  }
}

const TextSide = () => {
  const addCmp = useAddCanvasCmps()
  return (
    <div className={styles.details}>
      <Card onClick={() => addCmp(h1)}>
        <h2>标题</h2>
      </Card>
      <Card onClick={() => addCmp(text)}>
        <p>正文</p>
      </Card>
    </div>
  )
}

export default TextSide