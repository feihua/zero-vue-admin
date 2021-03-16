import request from '@/utils/request'

/**
 *查询商品品牌列表
 * @param query
 */
export function queryProductBrandList(query) {
  return request({
    url: '/api/product/brand/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除商品品牌
 * @param id
 */
export function deleteProductBrand(data) {
  return request({
    url: '/api/product/brand/delete',
    method: 'post',
    data
  })
}

/**
 *创建商品品牌
 * @param data
 */
export function createProductBrand(data) {
  return request({
    url: '/api/product/brand/add',
    method: 'post',
    data
  })
}

/**
 * 更新商品品牌
 * @param data
 */
export function updateProductBrand(data) {
  return request({
    url: '/api/product/brand/update',
    method: 'post',
    data
  })
}
