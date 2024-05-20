import React from "react";
import { Input, message } from 'antd';
import Ajax from '../until/ajax'

let user = {
    username: '',
    password: ''
}

function login(user) {
    const { username, password } = user;
    if (!user.username) {
        message.error('用户名不能为空')
        return
    }
    if (!user.password) {
        message.error('密码不能为空')
        return
    }
    Ajax.post('/api/login', { username, password }).then(res => {
        if (res.status === 200 && res.data.message == '登陆成功') {
            window.localStorage.setItem('token', res.data.token)
            window.location.hash = '/editor'
        } else {
            message.error('用户名或密码错误')
        }
    })

}

function LoginPage1(props) {

    return (
        <div className="container">
            <div className="login-wrapper">
                <div className="header">Login</div>
                <div className="form-wrapper">
                    <Input placeholder="username" className="input-item" bordered={false} onChange={(e) => { user.username = e.target.value }} />
                    <Input placeholder="password" className="input-item" bordered={false} onChange={(e) => { user.password = e.target.value }} />
                    {/* <input type="text" name="username" placeholder="username" className="input-item" /> */}
                    {/* <input type="password" name="password" placeholder="password" className="input-item" /> */}
                    <div className="btn" onClick={() => {
                        login(user)
                        // props.dispatch({ type: 'loginPage/login', user: user })
                    }}>Login</div>
                </div>
                <div className="msg">
                    Don't have account?
                    <a href="#">Sign up</a>
                </div>
            </div>
        </div>
    ) as any
}

export default LoginPage1;