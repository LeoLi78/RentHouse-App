import request from '@/utils/request'

export const login = ({ username, password }) => {
    return request({
        method: 'post',
        url: '/user/login',
        data: {
            username,
            password,
        }
    })
}

export const getUserInfo = () => {
    return request({
        url: 'user',
    })
}