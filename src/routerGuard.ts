import { message } from 'antd';

export default function routerGuard() {

    if (window.location.hash == '#/henyeOrders') {

        let henyeIdentity = window.localStorage.getItem('henyeIdentity')
        let loginTime = window.localStorage.getItem('loginTime')
        if (!henyeIdentity || !loginTime) window.location.hash = '/henye'
        if (loginTime && (new Date().getTime() - Number(loginTime) > 86400000 * 7)) {
            window.location.hash = '/henye'
            message.warning('登陆时间超过七天，请重新登录')
        }

    }

    if (window.location.hash == '#/editor') {

        const token = localStorage.getItem('token');
        if (!token) window.location.hash = '/login'

    }

    window.addEventListener('hashchange', (e) => {

        if (window.location.hash == '#/henyeOrders') {

            let henyeIdentity = window.localStorage.getItem('henyeIdentity')
            let loginTime = window.localStorage.getItem('loginTime')
            if (!henyeIdentity || !loginTime) window.location.hash = '/henye'
            if (loginTime && (new Date().getTime() - Number(loginTime) > 86400000 * 7)) {
                window.location.hash = '/henye'
                message.warning('登陆时间超过七天，请重新登录')
            }
            return

        }

        const token = localStorage.getItem('token');
        if (!token) window.location.hash = '/login'

    })
}