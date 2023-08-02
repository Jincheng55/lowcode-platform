import React, { Fragment } from 'react'
import styles from './rightClickMenu.less'
import { Button } from 'antd'
import { useCanvasContextData } from '../../../store/hooks'
const RightClickMenu = ({ cmp, index, setShowMenu }) => {

  const canvas = useCanvasContextData()
  const copyCmp = (e) => {
    e.stopPropagation()
    canvas.copyCmps()
    setShowMenu(false)
  }

  const delCmp = (e) => {
    e.stopPropagation()
    canvas.deleteCmps()
    setShowMenu(false)
  }

  const moveup = (index) => {
    canvas.moveupCmp(index)
    setShowMenu(false)
  }

  const movedown = index => {
    canvas.moveDownCmp(index)
    setShowMenu(false)
  }

  return (
    <div className={styles.right_menu}>
      <Button type="text" block onClick={e => copyCmp(e)}>
        copy
      </Button>
      <Button type="text" block onClick={e => delCmp(e)}>
        delete
      </Button>
      {
        canvas.selectedIndex.size === 1 &&
        <Fragment>
          <Button type="text" block onClick={e => moveup(index)}>
            up
          </Button>
          <Button type="text" block onClick={e => movedown(index)}>
            down
          </Button>
        </Fragment>
      }

    </div>
  )
}

export default RightClickMenu