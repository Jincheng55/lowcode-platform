import React, { useState } from 'react'
import styles from './left.less'
import { textType, imgType, templateType, graphType } from '../../utils/const'
import TextSide from '../../components/TextSide/TextSide'
import ImgSide from '../../components/ImgSide/ImgSide'
import TemplateSide from '../../components/TemplateSide/TemplateSide'
import GraphSide from '../../components/GraphSide/GraphSide'
const Left = () => {
  const [showDetails, setShowDetails] = useState(0)
  const changeShowType = (type) => {
    if (showDetails === type) {
      setShowDetails(0)
      return
    }
    setShowDetails(type)
  }
  return (
    <div className={styles.left}>

      <span className={showDetails === textType ? styles.selected : ''} onClick={() => changeShowType(textType)}>文本/标题</span>
      <span className={showDetails === imgType ? styles.selected : ''} onClick={() => changeShowType(imgType)}>图片/视频</span>
      <span className={showDetails === templateType ? styles.selected : ''} onClick={() => changeShowType(templateType)}>模版</span>
      <span className={showDetails === graphType ? styles.selected : ''} onClick={() => changeShowType(graphType)}>图形</span>
      {showDetails === textType && <TextSide></TextSide>}
      {showDetails === imgType && <ImgSide></ImgSide>}
      {showDetails === templateType && <TemplateSide></TemplateSide>}
      {showDetails === graphType && <GraphSide></GraphSide>}
    </div>
  )
}

export default Left