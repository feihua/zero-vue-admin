import request from '@/utils/request'

/**
 *查询商品列表列表
 * @param query
 */
export function queryProductList(query) {
  return request({
    url: '/api/product/product/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除商品列表
 * @param id
 */
export function deleteProduct(data) {
  return request({
    url: '/api/product/product/delete',
    method: 'post',
    data
  })
}

/**
 *创建商品列表
 * @param data
 */
export function createProduct(data) {
  return request({
    url: '/api/product/product/add',
    method: 'post',
    data
  })
}

/**
 * 更新商品列表
 * @param data
 */
export function updateProduct(data) {
  return request({
    url: '/api/product/product/update',
    method: 'post',
    data
  })
}
