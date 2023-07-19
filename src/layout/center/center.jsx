import React from 'react'
import styles from './center.less'
import { useCanvasCmps, useCanvasContextData } from '../../store/hooks'
import Cmps from '../../components/Cmps'
const Center = () => {
  const canvasData = useCanvasContextData()
  const cmps = useCanvasCmps()
  console.log(canvasData)
  console.log(cmps);
  return (
    <div className={styles.center}>
      {
        cmps.map(cmp => <Cmps key={cmp.key} cmp={cmp}></Cmps>)
      }
    </div>
  )
}

export default Center