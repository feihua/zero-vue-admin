import request from '@/utils/request'

/**
 *查询商品类别列表
 * @param query
 */
export function queryProductCategoryList(query) {
  return request({
    url: '/api/product/category/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除商品类别
 * @param id
 */
export function deleteProductCategory(data) {
  return request({
    url: '/api/product/category/delete',
    method: 'post',
    data
  })
}

/**
 *创建商品类别
 * @param data
 */
export function createProductCategory(data) {
  return request({
    url: '/api/product/category/add',
    method: 'post',
    data
  })
}

/**
 * 更新商品类别
 * @param data
 */
export function updateProductCategory(data) {
  return request({
    url: '/api/product/category/update',
    method: 'post',
    data
  })
}
