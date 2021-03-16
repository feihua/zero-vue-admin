import request from '@/utils/request'

/**
 *查询退货原因列表
 * @param query
 */
export function queryOrderReturnReasonList(query) {
  return request({
    url: '/api/order/returnreason/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除退货原因
 * @param id
 */
export function deleteOrderReturnReason(data) {
  return request({
    url: '/api/order/returnreason/delete',
    method: 'post',
    data
  })
}

/**
 *创建退货原因
 * @param data
 */
export function createOrderReturnReason(data) {
  return request({
    url: '/api/order/returnreason/add',
    method: 'post',
    data
  })
}

/**
 * 更新退货原因
 * @param data
 */
export function updateOrderReturnReason(data) {
  return request({
    url: '/api/order/returnreason/update',
    method: 'post',
    data
  })
}
