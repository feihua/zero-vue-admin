import request from '@/utils/request'

/**
 *查询首页推荐商品列表
 * @param query
 */
export function queryHomeRecommendProductList(query) {
  return request({
    url: '/api/sms/homerecommendproduct/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除首页推荐商品
 * @param id
 */
export function deleteHomeRecommendProduct(data) {
  return request({
    url: '/api/sms/homerecommendproduct/delete',
    method: 'post',
    data
  })
}

/**
 *创建首页推荐商品
 * @param data
 */
export function createHomeRecommendProduct(data) {
  return request({
    url: '/api/sms/homerecommendproduct/add',
    method: 'post',
    data
  })
}

/**
 * 更新首页推荐商品
 * @param data
 */
export function updateHomeRecommendProduct(data) {
  return request({
    url: '/api/sms/homerecommendproduct/update',
    method: 'post',
    data
  })
}
