import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { Input, message, Upload, Button, Image } from 'antd';
import Ajax from '../until/ajax';

const { TextArea } = Input;

function edit() {
  // editor 实例
  const [list, setList] = useState([])
  const [formData, setFormData] = useState({} as any);
  const [images, setImages] = useState([]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }} >
        插图
      </div>
    </div>
  );

  const get = () => {
    let param = { type: 'get', data: {}, sql_name: 'doc' }
    Ajax.post('/api/action', param).then(res => {
      if (res.status === 200) setList(res.data)
    })
  }

  const post = () => {
    let parma = { type: 'put', data: formData, sql_name: 'doc', images: images.length == 0 ? [] : images }
    if (formData.title && formData.content) {
      Ajax.post('/api/action', parma).then(res => {
        if (res.status == 200) {
          setList([...list, formData])
          message.success('插入成功')
          setFormData({ title: '', content: '' })
        }
      })
    } else {
      alert('标题和内容不能为空')
    }
  }

  const Delete = (_id) => {
    let param = { type: 'delete', data: { _id }, sql_name: 'doc' }
    Ajax.post('/api/action', param).then(res => {
      if (res.status === 200) message.success('删除成功')
    })
  }

  const edit = (formData) => {
    let param = { type: 'patch', newData: formData, oldData: { _id: formData._id }, sql_name: 'doc' }
    Ajax.post('/api/action', param).then(res => {
      if (res.status === 200) {
        message.success('修改成功')
        setFormData({ title: '', content: '' })
        let index = list.findIndex(i => { return i._id == formData._id })
        let newData = [...list]
        newData[index] = formData
        setList(newData)
      }
    })
  }

  useEffect(() => {
    get()
  }, [])

  const imagesNode = (images) => {
    let img = [...images].map(i => ({ url: 'http://localhost:3000/' + i.url }))
    return img.map(i => {
      return <Image
        width={200}
        src={i.url}
      />
    })
  }

  const [number, setNumber] = useState(0)
  return (
    <>
      <div style={{ height: '500px', padding: '30px', overflow: 'auto' }}>
        {list.map(i => {
          return <>
            <p style={{ fontSize: '32px', display: 'flex', justifyContent: 'space-between' }} onClick={() => {
              setImages(i.images || [])
              setFormData(i)
            }}> <span>{i.title}</span> <DeleteOutlined onClick={() => {
              let newList = list.filter(o => { return o._id != i._id })
              setList(newList)
              Delete(i._id)
            }} /></p>
            {/* <image>{i.imaeg}</image>
            <p>{i.content}</p> */}
          </>
        })}
      </div>
      <div style={{ padding: '30px' }}>
        <TextArea value={formData.title} rows={4} style={{ marginBottom: '15px' }} onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} />
        {imagesNode(images)}
        <Upload
          style={{ marginTop: '30px' }}
          listType="picture-card"
          showUploadList={false}
          onChange={(info) => {

            if (info.file.percent === 100) {
              let buffer = new FormData()
              buffer.append('/blog/' + new Date().getTime() + '.' + info.file.type.split('/')[1], info.file.originFileObj)
              Ajax.post('/api/upload', buffer).then(res => {
                console.log(res)

                if (res.status === 200) {
                  // let img = [{ url: 'http://localhost:3000/'+res.data.url }, ...images ]
                  setImages([...images, { url: res.data.url }])

                  //  setImages( (e)=>{ return [...e,{ url: 'http://localhost:3000/'+res.data.url }]  })
                }

              })

            }

          }}
        >
          {uploadButton}
        </Upload>

        <TextArea
          value={formData.content}
          showCount
          maxLength={100}
          style={{ height: 500 }}
          onChange={(e) => { setFormData({ ...formData, content: e.target.value }) }}
          placeholder="can resize"
        />

        <Button type="primary" style={{ marginTop: '15px' }} onClick={() => {
          //  setNumber( e=> { return e+1 } )
          formData._id ? edit(formData) : post()
        }}>{formData._id ? '修改文档' : '插入文档'}</Button>
      </div>

    </>
  )
}

export default connect(({ example }) => ({ example }))(edit);