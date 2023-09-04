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
    if (newVal.color) newVal.color = `#${newVal.color.toHex()}`
    console.log(newVal)
    canvas.setCanvas(newVal)
  }

  return (
    <div >
      <h3 style={{ textAlign: 'center', margin: '1rem 0' }}>Edit Background</h3>
      <Form
        labelCol={{ span: 6 }}
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
      </Form>
    </div>
  )
}

export default EditCanvas