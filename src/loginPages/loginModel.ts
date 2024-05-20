// import { message } from 'antd';
// import Ajax from '../until/ajax'
// export default {

//     namespace: 'loginPage',

//     state: {
//         start: 0
//     },

//     effects: {
//         *login({ user }, { call, put }) {  // eslint-disable-line
            
//             yield put({ type: 'save' });
//         },
//         //恒业代商务公司
//         *login2({ user }, { call, put }) {  // eslint-disable-line
//             const { username, password } = user;
//             if (!user.username) {
//                 message.error('用户名不能为空')
//                 return
//             }
//             if (!user.password) {
//                 message.error('密码不能为空')
//                 return
//             }
//             let admin = {
//                 username: 'admin',
//                 password: '333555777999管理员',
//                 identity: '管理员'
//             }
//             let salesman = {
//                 username: 'salesman',
//                 password: 'qwerty',
//                 identity: '业务员'
//             }

//             if (username == 'admin' && password == '333555777999管理员') {
//                 window.localStorage.setItem('henyeIdentity', '管理员')
//                 window.localStorage.setItem('loginTime', new Date().getTime() + '')
//                 window.location.hash = '/henyeOrders'
//                 return
//             } else if (username == 'salesman' && password == 'qwerty') {
//                 window.localStorage.setItem('henyeIdentity', '管理员')
//                 window.localStorage.setItem('loginTime', new Date().getTime() + '')
//                 window.location.hash = '/henyeOrders'
//             } else {
//                 message.error('用户名或密码错误')
//             }
            
//             yield put({ type: 'save' });
//         },
//     },

//     reducers: {
//         save(state, action) {
//             return { ...state, ...action.payload };
//         },
//     },

//     // subscriptions: {
//     //     setup({ dispatch, history }) {  // eslint-disable-line
//     //     },
//     // },
// };
