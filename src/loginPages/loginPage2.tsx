import React from "react";
import { Input, message } from 'antd';

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
    let admin = {
        username: 'admin',
        password: '333555777999管理员',
        identity: '管理员'
    }
    let salesman = {
        username: 'salesman',
        password: 'qwerty',
        identity: '业务员'
    }

    if (username == 'admin' && password == '333555777999管理员') {
        window.localStorage.setItem('henyeIdentity', '管理员')
        window.localStorage.setItem('loginTime', new Date().getTime() + '')
        window.location.hash = '/henyeOrders'
        return
    } else if (username == 'salesman' && password == 'qwerty') {
        window.localStorage.setItem('henyeIdentity', '业务员')
        window.localStorage.setItem('loginTime', new Date().getTime() + '')
        window.location.hash = '/henyeOrders'
    } else {
        message.error('用户名或密码错误')
    }

}

function LoginPage1(props) {

    return (
        <div className="container login2">
            <div className="login-wrapper">
                <div className="header">恒 业 系 统</div>
                <div className="form-wrapper">
                    <Input placeholder="用户名" className="input-item" bordered={false} onChange={(e) => { user.username = e.target.value }} />
                    <Input placeholder="密码" className="input-item" bordered={false} onChange={(e) => { user.password = e.target.value }} />
                    {/* <input type="text" name="username" placeholder="username" className="input-item" /> */}
                    {/* <input type="password" name="password" placeholder="password" className="input-item" /> */}
                    <div className="btn" onClick={() => {
                        login(user)
                        // props.dispatch({ type: 'loginPage/login2', user: user })
                    }}>登录</div>
                </div>
                {/* <div className="msg">
                    Don't have account?
                    <a href="#">Sign up</a>
                </div> */}
            </div>
        </div>
    ) as any
}

export default LoginPage1;