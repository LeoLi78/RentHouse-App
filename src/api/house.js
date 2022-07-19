import request from '@/utils/request'

export const getHouseCondition = (id) => {
    return request({
        url: 'houses/condition',
        params: {
            id
        }
    })
}
/**
 * 根据条筛选房屋
 * @param {*} params 
 * @returns 
 */
export const getAllSelectHouse = (params) => {
    return request({
        url: '/houses',
        params
    })
}
/**
 * 根据房屋id获取房屋详情
 * @param {房屋housecode} houseCode 
 * @returns 
 */
export const getHouseInfo = (houseCode) => {
    return request({
        url: `/houses/${houseCode}`,
    })
}
/**
 * 判断是否收藏
 * @param {*} houseCode 
 * @returns 
 */
export const isCollect = (houseCode) => {
    return request({
        url: `/user/favorites/${houseCode}`
    })
}
/**
 * 收藏
 * @param {s} houseCode 
 * @returns 
 */

export const addCollect = (houseCode) => {
    return request({
        method: 'POST',
        url: `/user/favorites/${houseCode}`
    })
}
/**
 * 取消关注
 * @param {*} houseCode 
 * @returns 
 */
export const delCollect = (houseCode) => {
    return request({
        method: 'DELETE',
        url: `/user/favorites/${houseCode}`
    })
}
/**
 * 发布房源
 * @param {*} body 
 * @returns 
 */
export const addHouse = (data) => {
    return request({
        url: '/user/houses',
        method: 'POST',
        data
    })
}

export const addImage = (data) => {
    return request({
        url: '/houses/image',
        method: 'POST',
        // headers: { 'content-type': 'multipart/form-data' },
        data
    })
}