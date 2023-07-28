import React from 'react'
import { useCanvasContextData } from '../../store/hooks'
import styles from './cmps.less'
import Text from './text/Text'
import ImgCmp from './imgComponent/ImgCmp'
import { RotateRightOutlined } from '@ant-design/icons'
const Cmp = ({ cmp, index }) => {
  const canvas = useCanvasContextData()
  const onClick = (e) => {
    e.stopPropagation()
    canvas.setSelectedIndex(index)
  }
  // 在画布上移动组件位置
  const onMouseDownOfCmp = (e) => {
    e.preventDefault();
    onClick(e)
    let startX = e.pageX;
    let startY = e.pageY;
    const scale = canvas.canvas.style.transform?.split('scale(')?.at(-1)?.split(')')[0] ?? 1
    const cmp = canvas.canvas.cmps[canvas.selectedIndex]
    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;
      let disX = x - startX;
      let disY = y - startY;
      disX = disX / scale;
      disY = disY / scale;
      const top = cmp.style.top + disY;
      const left = cmp.style.left + disX;
      canvas.setSelectedCmp({ top, left })
      startX = x;
      startY = y;
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };


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

  const rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { style } = cmp;
    let { height, transform } = style;
    transform = !transform ? 0 : (transform.split('(').at(-1)).split('deg')[0] + 0
    const trans = parseFloat(transform);
    const r = height / 2;
    const ang = ((trans + 90) * Math.PI) / 180;
    const [offsetX, offsetY] = [-Math.cos(ang) * r, -Math.sin(ang) * r];
    let startX = e.pageX + offsetX;
    let startY = e.pageY + offsetY;
    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;
      let disX = x - startX;
      let disY = y - startY;
      let deg = (360 * Math.atan2(disY, disX)) / (2 * Math.PI) - 90;
      deg = deg.toFixed(2);
      console.log(deg)
      canvas.setSelectedCmp({
        transform: `rotate(${deg}deg)`
      })
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  return (
    <div
      onMouseDown={onMouseDownOfCmp}
      onClick={e => onClick(e)} style={{ position: 'absolute' }}>
      {/* 组件 */}
      <div style={cmp.style}>
        {getCmp(cmp)}
      </div>
      {/* 组件的装饰，选中时的边框 */}
      {
        canvas.selectedIndex === index &&
        <ul
          className={
            styles.editStyle
          }
          style={{
            width: cmp.style.width,
            height: cmp.style.height,
            top: cmp.style.top - 2,
            left: cmp.style.left - 2,
            transform: cmp.style.transform
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
          <li className={styles.rotate} style={{
            top: cmp.style.height + 8,
            left: cmp.style.width / 2 - 8,
          }}
            onMouseDown={rotate}
          >
            <RotateRightOutlined />
          </li>
        </ul>
      }
    </div>
  )
}

const getCmp = (cmp) => {
  switch (cmp.type) {
    case 'img':
      return <ImgCmp cmp={cmp}></ImgCmp>;
    default:
      return <Text cmp={cmp}></Text>
  }
}

export default Cmp