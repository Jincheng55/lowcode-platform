import React from 'react'
import styles from './details.less'
import { Card } from 'antd'
import { useAddCanvasCmps } from '../../store/hooks'

const h1 = {
  type: "h1",
  content: '标题',
  style: {
    color: 'pink',
    position: 'absolute',
    left: 0,
    top: 0
  }
}

const text = {
  type: "text",
  content: '正文',
  style: {
    color: 'blue',
    position: 'absolute',
    left: 0,
    top: 0
  }
}

const Details = () => {
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

export default Details