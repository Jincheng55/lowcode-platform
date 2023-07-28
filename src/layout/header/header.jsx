import React from 'react'
import styles from './header.less'
import { Button } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined, ClearOutlined, SaveOutlined } from '@ant-design/icons'
import { useCanvasContextData } from '../../store/hooks'
const LayoutHeader = () => {
  const canvas = useCanvasContextData()
  return (
    <div className={styles.header}>
      <div></div>
      <div>
        <Button onClick={e => canvas.goBack()} icon={<ArrowLeftOutlined />} ghost>上一步</Button>
      </div>
      <div>
        <Button onClick={e => canvas.goForward()} icon={<ArrowRightOutlined />} ghost>下一步</Button>
      </div>
      <div>
        <Button onClick={e => canvas.clearCanvas()} icon={<ClearOutlined />} danger ghost>清除画布</Button>
      </div>
      <div>
        <Button icon={<SaveOutlined />} ghost>保存</Button>
      </div>
      <div></div>
    </div>
  )
}

export default LayoutHeader