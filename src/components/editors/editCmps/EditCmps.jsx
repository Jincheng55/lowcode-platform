import React, { useEffect } from 'react'
import { useCanvasCmps, useCanvasContextData } from '../../../store/hooks'
import { ColorPicker, Form, Input } from 'antd'

const EditCmps = () => {
  const canvas = useCanvasContextData()
  const cmps = useCanvasCmps()
  const cmp = cmps[canvas.getSelectedIndex()[0]]
  const valuesToNumber = (obj) => {
    const numberMap = {
      left: true,
      top: true,
      width: true,
      height: true,
      fontSize: true,
    }
    for (let k in obj) {
      if (numberMap[k]) obj[k] = Number(obj[k])
    }
    return obj
  }
  const onFormChange = (newVal) => {
    if (newVal.content) {
      canvas.setSelectedCmp(null, newVal.content)
      return
    }
    newVal = valuesToNumber(newVal)
    const changeVal = {}
    if (newVal.backgroundImage) changeVal.backgroundImage = `url(${newVal.backgroundImage})`
    if (newVal.backgroundColor) changeVal.backgroundColor = `#${newVal.backgroundColor.toHex()}`
    if (newVal.color) changeVal.color = `#${newVal.color.toHex()}`
    if (newVal.transform) changeVal.transform = `rotate(${newVal.transform}deg)`
    if (newVal.border) changeVal.border = `${newVal.border}px solid`
    console.log(changeVal)
    canvas.setSelectedCmp(changeVal)
  }
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(cmp.style)
    form.setFieldValue('content', cmp.content)
    form.setFieldValue('transform', !cmp.style.transform ? 0 : (cmp.style.transform.split('(').at(-1)).split('deg')[0])
    form.setFieldValue('border', cmp.style.border?.split('px solid')[0] ?? 0)
  }, [cmp.style, form, cmp.content])
  // todo  border font weight line height 
  return (
    <div >
      <h3 style={{ textAlign: 'center', margin: '1rem 0' }}> Edit Component</h3>
      <Form
        form={form}
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
        <Form.Item label="rotate" name='transform'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
        <Form.Item label="borderRadius" name='borderRadius'>
          <Input placeholder='input 5px / 50% string' />
        </Form.Item>
        <Form.Item label="border" name='border'>
          <Input type='number' placeholder='input number (px)' />
        </Form.Item>
        {
          (cmp.type === 'text' || cmp.type === 'h1') &&
          <Form.Item label="content" name='content'>
            <Input />
          </Form.Item>
        }
      </Form>
    </div>
  )
}

export default EditCmps