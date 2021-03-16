import request from '@/utils/request'

/**
 *查询订单设置列表
 * @param query
 */
export function queryOrderSettingList(query) {
  return request({
    url: '/api/order/setting/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除订单设置
 * @param id
 */
export function deleteOrderSetting(data) {
  return request({
    url: '/api/order/setting/delete',
    method: 'post',
    data
  })
}

/**
 *创建订单设置
 * @param data
 */
export function createOrderSetting(data) {
  return request({
    url: '/api/order/setting/add',
    method: 'post',
    data
  })
}

/**
 * 更新订单设置
 * @param data
 */
export function updateOrderSetting(data) {
  return request({
    url: '/api/order/setting/update',
    method: 'post',
    data
  })
}
