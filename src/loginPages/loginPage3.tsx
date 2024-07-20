import React from "react";
import { Input, message } from 'antd';
import Ajax from '../until/ajax'
import '../../style/loginPages/page1.scss';

function LoginPage3(props) {

    return (
        <div id="login_box">
            <h2>LOGIN</h2>
            <div id="input_box">
                <input type="text" placeholder="请输入用户名" />
            </div>
            <div className="input_box">
                <input type="password" placeholder="请输入密码" />
            </div>
            <button>登录</button>
        </div>
    ) as any
}

export default LoginPage3;