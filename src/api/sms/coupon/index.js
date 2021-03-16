import request from '@/utils/request'

/**
 *查询优惠券列表
 * @param query
 */
export function queryCouponList(query) {
  return request({
    url: '/api/sms/coupon/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除优惠券
 * @param id
 */
export function deleteCoupon(data) {
  return request({
    url: '/api/sms/coupon/delete',
    method: 'post',
    data
  })
}

/**
 *创建优惠券
 * @param data
 */
export function createCoupon(data) {
  return request({
    url: '/api/sms/coupon/add',
    method: 'post',
    data
  })
}

/**
 * 更新优惠券
 * @param data
 */
export function updateCoupon(data) {
  return request({
    url: '/api/sms/coupon/update',
    method: 'post',
    data
  })
}
