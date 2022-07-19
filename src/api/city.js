import request from '@/utils/request'
/**
 * 获取热门城市
 * @returns 
 */
export const getHotCity = () => {
    return request({
        url: 'area/hot'
    })
}

export const getAllCity = (level) => {
    return request({
        url: 'area/city',
        params: {
            level
        }
    })
}

/**
 * 查询小区
 */
export const getCommunity = ({ name, id }) => {
    return request({
        url: '/area/community',
        params: {
            name,
            id
        }
    })
}