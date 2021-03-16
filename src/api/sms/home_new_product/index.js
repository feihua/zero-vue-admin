import request from '@/utils/request'

/**
 *查询首页新品列表
 * @param query
 */
export function queryHomeNewProductList(query) {
  return request({
    url: '/api/sms/homenewproduct/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除首页新品
 * @param id
 */
export function deleteHomeNewProduct(data) {
  return request({
    url: '/api/sms/homenewproduct/delete',
    method: 'post',
    data
  })
}

/**
 *创建首页新品
 * @param data
 */
export function createHomeNewProduct(data) {
  return request({
    url: '/api/sms/homenewproduct/add',
    method: 'post',
    data
  })
}

/**
 * 更新首页新品
 * @param data
 */
export function updateHomeNewProduct(data) {
  return request({
    url: '/api/sms/homenewproduct/update',
    method: 'post',
    data
  })
}
