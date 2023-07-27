import React from 'react'
import styles from '../ImgSide/imgside.less'
import { Card } from 'antd'
import { useCanvasContextData } from '../../store/hooks'
const TemplateSide = () => {
  const canvas = useCanvasContextData()
  const fakeData = [
    {
      name: 'test', canvas: {
        style: {
          width: 320,
          height: 568,
          position: 'relative',
          border: '1px solid',
          backgroundColor: '#b8279b',
          backgroundImage: '',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          boxSizing: 'content-box',
          overflow: 'hidden',
        },
        cmps: [
          {
            type: "text",
            content: 'testTemplate',
            style: {
              color: '#2d7ac2',
              position: 'absolute',
              left: 50,
              top: 50,
              width: 100,
              height: 50,
              fontSize: 14
            }
          }
        ]
      }
    }
  ]

  const setTemplate = (template) => {
    canvas.setTemplate(template)
  }

  return (
    <div className={styles.details}>
      {
        fakeData.map(item => {
          return <Card key={item.name} onClick={() => setTemplate(item)}>{item.name}</Card>
        })
      }
    </div >
  )
}

export default TemplateSide