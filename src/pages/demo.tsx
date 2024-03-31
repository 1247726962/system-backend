import React from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd/es';

class Demo extends React.Component {
  state = {
    inputValue: null,
    inProess: [],
    completed: []
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
    </div>
  }
}

export default connect(({ example }) => ({ example }))(Demo);