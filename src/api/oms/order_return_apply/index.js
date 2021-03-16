import request from '@/utils/request'

/**
 *查询退货订单列表
 * @param query
 */
export function queryOrderReturnApplyList(query) {
  return request({
    url: '/api/order/returnapply/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除退货订单
 * @param id
 */
export function deleteOrderReturnApply(data) {
  return request({
    url: '/api/order/returnapply/delete',
    method: 'post',
    data
  })
}

/**
 *创建退货订单
 * @param data
 */
export function createOrderReturnApply(data) {
  return request({
    url: '/api/order/returnapply/add',
    method: 'post',
    data
  })
}

/**
 * 更新退货订单
 * @param data
 */
export function updateOrderReturnApply(data) {
  return request({
    url: '/api/order/returnapply/update',
    method: 'post',
    data
  })
}
