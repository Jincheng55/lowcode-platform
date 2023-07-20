import React from 'react'
import styles from './center.less'
import { useCanvasCmps } from '../../store/hooks'
import Cmps from '../../components/Cmps'
const Center = () => {
  const cmps = useCanvasCmps()
  return (
    <div className={styles.center} >
      <div className={styles.canvas}>
        {
          cmps.map(cmp => <Cmps key={cmp.key} cmp={cmp}></Cmps>)
        }
      </div>

    </div>
  )
}

export default Center