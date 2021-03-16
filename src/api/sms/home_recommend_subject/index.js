import request from '@/utils/request'

/**
 *查询首页推荐专题列表列表
 * @param query
 */
export function queryHomeRecommendSubjectList(query) {
  return request({
    url: '/api/sms/homerecommendsubject/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除首页推荐专题列表
 * @param id
 */
export function deleteHomeRecommendSubject(data) {
  return request({
    url: '/api/sms/homerecommendsubject/delete',
    method: 'post',
    data
  })
}

/**
 *创建首页推荐专题列表
 * @param data
 */
export function createHomeRecommendSubject(data) {
  return request({
    url: '/api/sms/homerecommendsubject/add',
    method: 'post',
    data
  })
}

/**
 * 更新首页推荐专题列表
 * @param data
 */
export function updateHomeRecommendSubject(data) {
  return request({
    url: '/api/sms/homerecommendsubject/update',
    method: 'post',
    data
  })
}
