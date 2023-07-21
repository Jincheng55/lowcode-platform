import React from 'react'
import styles from './imgside.less'
import { Card } from 'antd'
import Uploader from './uploader/Uploader'

const ImgSide = () => {
  return (
    <div className={styles.details}>
      <Card >
        <Uploader type={'img'}></Uploader>
      </Card>
      <Card >
        <Uploader type={'video'}></Uploader>
      </Card>
    </div>
  )
}



export default ImgSide