import React, { useState } from 'react'
import styles from './header.less'
import { Button, message } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined, ClearOutlined, SaveOutlined } from '@ant-design/icons'
import { useCanvasContextData } from '../../store/hooks'
import html2canvas from 'html2canvas'
const LayoutHeader = () => {
  const canvas = useCanvasContextData()
  const [saveLoading, setSaveLoading] = useState(false)
  const saveAsBase64 = async () => {
    setSaveLoading(true)
    const dom = document.getElementById('canvas')
    try {
      const toCanvas = await html2canvas(dom)
      console.log(toCanvas);
      const imgBase64 = toCanvas.toDataURL('image/png')
      // 创建一个下载链接并触发下载
      const downloadLink = document.createElement('a');
      downloadLink.href = imgBase64;
      downloadLink.download = 'screenshot.png'; // 保存的文件名
      downloadLink.click();
      downloadLink.remove()
    }
    catch (e) {
      message.error(e.message)
    }
    setSaveLoading(false)
  }

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
        <Button loading={saveLoading} onClick={saveAsBase64} icon={<SaveOutlined />} ghost>保存</Button>
      </div>
      <div></div>
    </div>
  )
}

export default LayoutHeader