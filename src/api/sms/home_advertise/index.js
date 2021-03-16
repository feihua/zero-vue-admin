import request from '@/utils/request'

/**
 *查询首页广告列表
 * @param query
 */
export function queryHomeAdvertiseList(query) {
  return request({
    url: '/api/sms/homeadvertise/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除首页广告
 * @param id
 */
export function deleteHomeAdvertise(data) {
  return request({
    url: '/api/sms/homeadvertise/delete',
    method: 'post',
    data
  })
}

/**
 *创建首页广告
 * @param data
 */
export function createHomeAdvertise(data) {
  return request({
    url: '/api/sms/homeadvertise/add',
    method: 'post',
    data
  })
}

/**
 * 更新首页广告
 * @param data
 */
export function updateHomeAdvertise(data) {
  return request({
    url: '/api/sms/homeadvertise/update',
    method: 'post',
    data
  })
}
