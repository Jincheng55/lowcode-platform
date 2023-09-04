import React from 'react'
import styles from './center.less'
import { useCanvasCmps, useCanvasContextData } from '../../store/hooks'
import Cmps from '../../components/cmps/Cmps'
import { InputNumber } from 'antd'
const Center = () => {
  const cmps = useCanvasCmps()
  const canvas = useCanvasContextData()
  const onDrop = (e) => {
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
    if (!canvas.selectedIndex.size) return
    if (e.keyCode < 37 || e.keyCode > 40) return
    e.stopPropagation();
    // 禁止默认事件，不然引发的可能是页面的上下左右滚动。
    e.preventDefault();
    const newStyle = {};
    switch (e.keyCode) {
      // 左
      case 37:
        newStyle.left = - 1;
        break;
      // 上
      case 38:
        newStyle.top = - 1;
        break;
      // 右
      case 39:
        newStyle.left = 1;
        break;
      // 下
      case 40:
        newStyle.top = 1;
        break;
      default:
        break;
    }
    canvas.patchSetSelectedCmps(newStyle);
  }
  return (
    <div className={styles.center} id='center' tabIndex="0" onKeyDown={keyEventMove}>
      <div id='canvas' style={{ ...canvas.canvas.style, position: 'absolute', top: '50px' }} onClick={e => canvasOnClick(e)} onDrop={onDrop} onDragOver={e => e.preventDefault()} >
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