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
    const diffX = e.pageX - start[0]
    const diffY = e.pageY - start[1]
    const cmp = cmps[canvas.selectedIndex]
    const style = { top: cmp.style.top + diffY, left: cmp.style.left + diffX }
    canvas.setSelectedCmp(style)
  }
  const canvasOnClick = (e) => {
    canvas.setSelectedIndex(null)
  }
  const onScaleChange = (val) => {
    if (!val) return
    canvas.setCanvas({ transform: `scale(${val / 100})` })
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
      <div style={canvas.canvas.style} onClick={e => canvasOnClick(e)} onDrop={onDrop} onDragOver={e => e.preventDefault()} >
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