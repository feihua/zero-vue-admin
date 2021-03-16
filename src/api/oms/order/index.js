import request from '@/utils/request'

/**
 *查询订单列表
 * @param query
 */
export function queryOrderList(query) {
  return request({
    url: '/api/order/order/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除订单
 * @param id
 */
export function deleteOrder(data) {
  return request({
    url: '/api/order/order/delete',
    method: 'post',
    data
  })
}

/**
 *创建订单
 * @param data
 */
export function createOrder(data) {
  return request({
    url: '/api/order/order/add',
    method: 'post',
    data
  })
}

/**
 * 更新订单
 * @param data
 */
export function updateOrder(data) {
  return request({
    url: '/api/order/order/update',
    method: 'post',
    data
  })
}
