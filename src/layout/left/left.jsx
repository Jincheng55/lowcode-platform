import React, { useState } from 'react'
import styles from './left.less'
import Details from '../../components/details/Details'

const Left = () => {

  const [showDetails, setShowDetails] = useState(false)
  return (
    <div className={styles.left}>

      <span className='test' onClick={() => setShowDetails(!showDetails)}>文本</span>
      <span>2</span>
      {
        showDetails && <Details></Details>
      }
    </div>
  )
}

export default Left