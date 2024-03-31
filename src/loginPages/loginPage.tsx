import React from "react";
import { connect } from 'dva';
import { Input } from 'antd';

let user = {
    username:'',
    password:''
}

function LoginPage1(props):React.FC {
 
    return (
        <div className="container">
            <div className="login-wrapper">
                <div className="header">Login</div>
                <div className="form-wrapper">
                    <Input placeholder="username" className="input-item" bordered={false} onChange={(e)=> { user.username = e.target.value } }/>
                    <Input placeholder="password" className="input-item" bordered={false} onChange={(e)=> { user.password = e.target.value }}/>
                    {/* <input type="text" name="username" placeholder="username" className="input-item" /> */}
                    {/* <input type="password" name="password" placeholder="password" className="input-item" /> */}
                    <div className="btn" onClick={()=>{ 
                        props.dispatch({ type: 'loginPage/login', user: user  }) 
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

export default connect(({ loginPage }) => ({ loginPage }))(LoginPage1);