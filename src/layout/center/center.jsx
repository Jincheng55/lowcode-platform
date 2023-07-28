import React, { useEffect } from 'react'
import styles from './center.less'
import { useCanvasCmps, useCanvasContextData } from '../../store/hooks'
import Cmps from '../../components/cmps/Cmps'
import { InputNumber } from 'antd'
const Center = () => {
  const cmps = useCanvasCmps()
  const canvas = useCanvasContextData()
  const onDrop = (e) => {
    const start = e.dataTransfer.getData('text')?.split(',')
    if (start?.length > 1) {
      cmpMove(start, e.pageX, e.pageY)
      return
    }
    const cmpString = e.dataTransfer.getData('cmp')
    if (cmpString) {
      dragCmpAdd(cmpString, e.pageX, e.pageY)
    }
  }
  const canvasOnClick = (e) => {
    canvas.setSelectedIndex(null)
  }
  const onScaleChange = (val) => {
    if (!val) return
    canvas.setCanvas({ transform: `scale(${val / 100})` })
  }
  // 移动选中组件
  const cmpMove = (start, pageX, pageY) => {
    const scale = canvas.canvas.style.transform?.split('scale(')?.at(-1)?.split(')')[0] ?? 1
    const diffX = pageX - start[0]
    const diffY = pageY - start[1]
    const cmp = cmps[canvas.selectedIndex]
    const style = { top: cmp.style.top + diffY / scale, left: cmp.style.left + diffX / scale }
    canvas.setSelectedCmp(style)
  }
  // 拖拽左边组件至画布指定位置
  const dragCmpAdd = (cmpString, pageX, pageY) => {
    const scale = canvas.canvas.style.transform?.split('scale(')?.at(-1)?.split(')')[0] ?? 1
    const cmpJson = JSON.parse(cmpString)
    cmpJson.style.top = (pageY - 114) / scale
    const leftStart = (document.body.clientWidth - 350 - 181 - canvas.canvas.style.width * scale) / 2
    cmpJson.style.left = (pageX - leftStart - 181) / scale
    canvas.addCmps(cmpJson)
  }
  const keyEventMove = (e) => {
    if (canvas.selectedIndex === null) return
    if (e.keyCode < 37 || e.keyCode > 40) return
    e.stopPropagation();
    // 禁止默认事件，不然引发的可能是页面的上下左右滚动。
    e.preventDefault();
    const { top, left } = cmps[canvas.selectedIndex].style;
    const newStyle = { top, left };
    switch (e.keyCode) {
      // 左
      case 37:
        newStyle.left -= 1;
        break;
      // 上
      case 38:
        newStyle.top -= 1;
        break;
      // 右
      case 39:
        newStyle.left += 1;
        break;
      // 下
      case 40:
        newStyle.top += 1;
        break;
      default:
        break;
    }
    canvas.setSelectedCmp(newStyle);
  }
  useEffect(() => {
    document.getElementById("center").onkeydown = keyEventMove;
  }, []);
  return (
    <div className={styles.center} id='center' tabIndex="0" >
      <div style={{ ...canvas.canvas.style, position: 'absolute', top: '50px' }} onClick={e => canvasOnClick(e)} onDrop={onDrop} onDragOver={e => e.preventDefault()} >
        {
          cmps.map((cmp, index) => <Cmps key={cmp.key} cmp={cmp} index={index}></Cmps>)
        }
      </div>
      <div className={styles.scale}>
        <InputNumber addonAfter="%" min={1} defaultValue={100} onChange={onScaleChange} />
      </div>
    </div>
  )
}

export default Center