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

  const onMounseDown = (e) => {
    const direction = e.target.dataset.direction
    if (!direction) return
    e.preventDefault()
    e.stopPropagation()
    const start = [e.pageX, e.pageY]
    const onmousemove = (e) => {
      const diff = [e.pageX - start[0], e.pageY - start[1]]
      const directArr = direction.split(' ')
      const style = {}
      // 左上点位移动时需要取反
      if (directArr.indexOf('top') >= 0) {
        diff[1] = - diff[1]
        style.top = cmp.style.top - diff[1]
      }
      if (directArr.indexOf('left') >= 0) {
        diff[0] = - diff[0]
        style.left = cmp.style.left - diff[0]
      }
      style.width = cmp.style.width + diff[0]
      style.height = cmp.style.height + diff[1]
      canvas.setSelectedCmp(style)
      // 将本次移动的结束点作为下次移动的起点
      start[0] = e.pageX
      start[1] = e.pageY
      // 鼠标抬起时取消事件
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onmousemove)
      })
    }
    document.addEventListener('mousemove', onmousemove)
  }

  return (
    <div draggable onDragStart={onDragStart} onClick={onClick} style={{ position: 'absolute' }}>
      {/* 组件 */}
      <div style={cmp.style}>{cmp.content}</div>
      {/* 组件的装饰，选中时的边框 */}
      {
        canvas.selectedIndex === index &&
        <div className={styles.decoration} style={{ width: cmp.style.width, height: cmp.style.height, left: cmp.style.left - 2, top: cmp.style.top - 2 }}>
          <ul
            className={
              styles.editStyle
            }
            style={{
              width: cmp.style.width,
              height: cmp.style.height,
            }}
            onMouseDown={onMounseDown}
          >
            <li
              className={styles.stretchDot}
              style={{ top: -8, left: -8 }}
              data-direction="top left"
            />

            <li
              className={styles.stretchDot}
              style={{
                top: -8,
                left: cmp.style.width / 2 - 8,
              }}
              data-direction="top"
            />

            <li
              className={styles.stretchDot}
              style={{ top: -8, left: cmp.style.width - 8 }}
              data-direction="top right"
            />

            <li
              className={styles.stretchDot}
              style={{ top: cmp.style.height / 2 - 8, left: cmp.style.width - 8 }}
              data-direction="right"
            />

            <li
              className={styles.stretchDot}
              style={{
                top: cmp.style.height - 8,
                left: cmp.style.width - 8,
              }}
              data-direction="bottom right"
            />

            <li
              className={styles.stretchDot}
              style={{
                top: cmp.style.height - 8,
                left: cmp.style.width / 2 - 8,
              }}
              data-direction="bottom"
            />

            <li
              className={styles.stretchDot}
              style={{
                top: cmp.style.height - 8,
                left: -8,
              }}
              data-direction="bottom left"
            />
            <li
              className={styles.stretchDot}
              style={{
                top: cmp.style.height / 2 - 8,
                left: -8,
              }}
              data-direction="left"
            />
          </ul>

        </div>
      }
    </div>
  )
}

export default Cmp