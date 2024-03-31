import { message } from 'antd';
import Ajax from '../until/ajax'
export default {

    namespace: 'loginPage',

    state: {
        start: 0
    },

    effects: {
        *login({ user }, { call, put }) {  // eslint-disable-line
            const { username, password } = user;
            if( !user.username ) {
                message.error('用户名不能为空')
                return
            }
            if( user.password!='qwerty' ) {
                message.error('密码不能为空')
                return
            }
            Ajax.post('/api/login', { username, password }).then(res => {
                if(res.status === 200 && res.data.message == '登陆成功' ) {
                   window.localStorage.setItem('token',res.data.token)
                   window.location.hash = '/home'
                }
                
            })

            yield put({ type: 'save' });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
    
    // subscriptions: {
    //     setup({ dispatch, history }) {  // eslint-disable-line
    //     },
    // },
};
