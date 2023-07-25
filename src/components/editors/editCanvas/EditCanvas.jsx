import { ColorPicker, Form, Input } from 'antd'
import React from 'react'
import { useCanvasContextData } from '../../../store/hooks'

const EditCanvas = () => {

  const canvas = useCanvasContextData()
  const onFormChange = (newVal) => {
    if (newVal.width) newVal.width = Number(newVal.width)
    if (newVal.height) newVal.height = Number(newVal.height)
    if (newVal.backgroundImage) newVal.backgroundImage = `url(${newVal.backgroundImage})`
    if (newVal.backgroundColor) newVal.backgroundColor = `#${newVal.backgroundColor.toHex()}`
    console.log(newVal)
    canvas.setCanvas(newVal)
  }

  return (
    <div >
      <h3 style={{ textAlign: 'center', margin: '1rem 0' }}> Edit Background</h3>
      <Form
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        initialValues={canvas.canvas.style}
        onValuesChange={onFormChange}
      >
        <Form.Item label="width" name='width'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
        <Form.Item label="height" name='height'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
        <Form.Item label="backgroundImage" name='backgroundImage'>
          <Input placeholder='input url' />
        </Form.Item>
        <Form.Item label="backgroundColor" name='backgroundColor'>
          <ColorPicker />
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditCanvas