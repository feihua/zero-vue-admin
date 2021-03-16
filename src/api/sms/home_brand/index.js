import request from '@/utils/request'

/**
 *查询首页品牌列表
 * @param query
 */
export function queryHomeBrandList(query) {
  return request({
    url: '/api/sms/homebrand/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除首页品牌
 * @param id
 */
export function deleteHomeBrand(data) {
  return request({
    url: '/api/sms/homebrand/delete',
    method: 'post',
    data
  })
}

/**
 *创建首页品牌
 * @param data
 */
export function createHomeBrand(data) {
  return request({
    url: '/api/sms/homebrand/add',
    method: 'post',
    data
  })
}

/**
 * 更新首页品牌
 * @param data
 */
export function updateHomeBrand(data) {
  return request({
    url: '/api/sms/homebrand/update',
    method: 'post',
    data
  })
}
