import action from '../until/action'

export default {

    namespace: 'loginPage',

    state: {
        start: 0
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *login({ user }, { call, put }) {  // eslint-disable-line
            const { username, password } = user;

            action.post('/api/login', { username, password }).then(res => {
                if(res.status === 200 && res.data.message == '登陆成功' ) {
                   window.localStorage.setItem('token',res.data.token)
                //    window.location.hash = '/home'
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
};
