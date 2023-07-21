import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useAddCanvasCmps } from '../../../store/hooks'

const img = {
  type: "img",
  content: 'base64',
  style: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 50
  }
}
const video = {
  type: 'video',
  content: 'url',
  style: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 50
  }
}

const Uploader = ({ type }) => {
  const addCmp = useAddCanvasCmps()
  const [loading, setLoading] = useState(false);


  const customRequest = (info) => {
    setLoading(true)
    if (type === 'img') addImg(info)
    else addVideo(info)
  }
  const addVideo = (info) => {
    //todo 添加视频，url或者本地上传
    getBase64(info.file, (base64) => {
      setLoading(false)
      addCmp(Object.assign(video, { content: base64 }))
    })
  }
  const addImg = (info) => {
    getBase64(info.file, (base64) => {
      setLoading(false)
      addCmp(Object.assign(img, { content: base64 }))
    })
  }
  const getBase64 = (img, callback) => {
    if (!img) return ''
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload {type}</div>
    </div>
  );
  const beforeUpload = (file) => {
    // todo 视频类型、大小过滤
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isJpgOrPng && type === 'img') {
      message.error('You can only upload JPG/PNG/WEBP file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };
  return (
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="#"
      beforeUpload={beforeUpload}
      customRequest={customRequest}
    >
      {uploadButton}
    </Upload>
  )
}

export default Uploader