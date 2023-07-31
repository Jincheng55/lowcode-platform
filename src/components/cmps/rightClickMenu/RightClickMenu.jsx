import React from 'react'
import styles from './rightClickMenu.less'
import { Button } from 'antd'
import { useCanvasContextData } from '../../../store/hooks'
const RightClickMenu = ({ cmp, index }) => {

  const canvas = useCanvasContextData()

  const copyCmp = (e) => {
    e.stopPropagation()
    const newCmp = JSON.parse(JSON.stringify(cmp))
    newCmp.style.top += 40
    newCmp.style.left += 40
    canvas.addCmps(newCmp)
  }

  const delCmp = (e) => {
    e.stopPropagation()
    if (canvas.selectedIndex === index) canvas.selectedIndex = null
    canvas.canvas.cmps = canvas.canvas.cmps.filter(item => item.key !== cmp.key)
    console.log(canvas.canvas.cmps)
    canvas.updateComponents()
  }

  return (
    <div className={styles.right_menu}>
      <Button type="text" block onClick={e => copyCmp(e)}>
        copy
      </Button>
      <Button type="text" block onClick={e => delCmp(e)}>
        delete
      </Button>
      <Button type="text" block>
        up
      </Button>
      <Button type="text" block>
        down
      </Button>
    </div>
  )
}

export default RightClickMenu