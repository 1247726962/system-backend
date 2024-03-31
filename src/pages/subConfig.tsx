import React from 'react';
import { connect } from 'dva';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload, Input } from 'antd';
import axios from 'axios'
import action from "../until/ajax";

class IndexPage extends React.Component {
  state = {
    inputValue: null,
    inProess: [],
    completed: [],

    fileList: [],
  }

  add(list, data) {
    let newList = []
    list.map(i => newList.push(i))
    newList.push(data)
    return newList
  }

  delete(list, data) {
    let newList = []
    list.map((o, i) => {
      if (i != list.findIndex(value => { return value == data })) newList.push(o)
    })
    return newList
  }

  inProessRender(inProessData) {
    return <span>{inProessData[0]}</span>
  }

  completedRender(data) {
    const { completed } = this.state
    let view = []
    data.map(i => view.push(
      // <div><span>{i}</span><Button onClick={() => this.setState({ completed: this.delete(completed, i) })}>删除</Button></div>
    ))
    return view
  }

  render() {
    const { inProess, completed, inputValue } = this.state
    return <div style={{ width: 500 }}>
      {/* <Input onChange={v => this.setState({ inProess: [v.target.value], inputValue: v.target.value })} value={inputValue}></Input> */}
      {/* <Button onClick={() => this.setState({ inProess: [], completed: this.add(completed, inProess[0]), inputValue: null })}>确认</Button> */}
      <div>正在进行中</div>
      {this.inProessRender(inProess)}
      <div>已完成</div>
      {this.completedRender(completed)}

      <Upload
        name='file'
        headers={{ authorization: 'authorization-text' }}
        multiple={true}
        onChange={(info) => {
          if (info.file.status !== 'uploading') {
            console.log(info)
            this.setState({ fileList: info.fileList })
          }
          // if (info.file.status === 'done') {
          //   message.success(`${info.file.name} file uploaded successfully`);
          // } else if (info.file.status === 'error') {
          //   message.error(`${info.file.name} file upload failed.`);
          // }
        }}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>

      <Button onClick={() => {
        // let param = new FormData()
        // this.state.fileList.map((i,o)=>{
        //   param.append("/images/" + '照片' + new Date().getTime() + o + '.png', i.originFileObj);
        // })
        let data = {}
        action.post('/api/test', data).then(res => {
          console.log(res)
        })
      }}>上传</Button>

    </div >
  }
}

export default connect(({ example }) => ({ example }))(IndexPage);