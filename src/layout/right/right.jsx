import React from 'react'
import styles from './right.less'
import { useCanvasContextData } from '../../store/hooks'
import EditCanvas from '../../components/editors/editCanvas/EditCanvas'
import EditCmps from '../../components/editors/editCmps/EditCmps'
const Right = () => {
  const canvas = useCanvasContextData()
  return (
    <div className={styles.right}>
      {
        canvas.getSelectedIndex().length !== 1 ? <EditCanvas /> : <EditCmps />
      }
    </div>
  )
}

export default Right