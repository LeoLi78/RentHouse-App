/**
 * 请求轮播图
 */
import request from '@/utils/request'
export const getSwiper = () => {
   return request({
      url: 'home/swiper'
   })
}

export const getRentHouse = (cityId) => {
   return request({
      url: 'home/groups',
      params: {
         area:cityId
      }
   })
}