import React from "react";
import { Input, message } from 'antd';
import Ajax from '../until/ajax'
import '../../style/loginPages/page2.scss';

function LoginPage4(props) {

    return (
        <div className="login-container">
        <div className="left-container">
            <div className="title"><span>登录</span></div>
            <div className="input-container">
                <input type="text" name="username" placeholder="用户名"/>
                <input type="password" name="password" placeholder="密码"/>
            </div>
            <div className="message-container">
                <span>忘记密码</span>
            </div>
        </div>
        <div className="right-container">
            <div className="regist-container">
                <span className="regist">注册</span>
            </div>
            <div className="action-container">
                <span>提交</span>
            </div>
        </div>
    </div>
    ) as any
}

export default LoginPage4;