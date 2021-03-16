import request from '@/utils/request'

/**
 *查询秒杀列表
 * @param query
 */
export function queryFlashPromotionList(query) {
  return request({
    url: '/api/sms/flashpromotion/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除秒杀
 * @param id
 */
export function deleteFlashPromotion(data) {
  return request({
    url: '/api/sms/flashpromotion/delete',
    method: 'post',
    data
  })
}

/**
 *创建秒杀
 * @param data
 */
export function createFlashPromotion(data) {
  return request({
    url: '/api/sms/flashpromotion/add',
    method: 'post',
    data
  })
}

/**
 * 更新秒杀
 * @param data
 */
export function updateFlashPromotion(data) {
  return request({
    url: '/api/sms/flashpromotion/update',
    method: 'post',
    data
  })
}
