import React from 'react'
import { useCanvasCmps, useCanvasContextData } from '../../../store/hooks'
import { ColorPicker, Form, Input } from 'antd'

const EditCmps = () => {
  const canvas = useCanvasContextData()
  const cmps = useCanvasCmps()
  const cmp = cmps[canvas.selectedIndex]
  const valuesToNumber = (obj) => {
    const numberMap = {
      left: true,
      top: true,
      width: true,
      height: true,
      fontSize: true
    }
    for (let k in obj) {
      if (numberMap[k]) obj[k] = Number(obj[k])
    }
    return obj
  }
  const onFormChange = (newVal) => {
    newVal = valuesToNumber(newVal)
    if (newVal.backgroundImage) newVal.backgroundImage = `url(${newVal.backgroundImage})`
    if (newVal.backgroundColor) newVal.backgroundColor = `#${newVal.backgroundColor.toHex()}`
    if (newVal.color) newVal.color = `#${newVal.color.toHex()}`
    console.log(newVal)
    canvas.setSelectedCmp(newVal)
  }

  return (
    <div >
      <h3 style={{ textAlign: 'center', margin: '1rem 0' }}> Edit Component</h3>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        initialValues={cmp.style}
        onValuesChange={onFormChange}
      >
        <Form.Item label="width" name='width'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
        <Form.Item label="height" name='height'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
        <Form.Item label="bgImage" name='backgroundImage'>
          <Input placeholder='input url' />
        </Form.Item>
        <Form.Item label="bgColor" name='backgroundColor'>
          <ColorPicker />
        </Form.Item>
        <Form.Item label="fontSize" name='fontSize'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
        <Form.Item label="fontColor" name='color'>
          <ColorPicker />
        </Form.Item>
        <Form.Item label="left" name='left'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
        <Form.Item label="top" name='top'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditCmps