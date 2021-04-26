import request from '@/utils/request'

/**
 *查询字典列表
 * @param query
 */
export function queryJobList(query) {
  return request({
    url: '/api/sys/job/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除字典
 * @param id
 */
export function deleteJob(data) {
  return request({
    url: '/api/sys/job/delete',
    method: 'post',
    data
  })
}

/**
 *创建字典
 * @param data
 */
export function createJob(data) {
  return request({
    url: '/api/sys/job/add',
    method: 'post',
    data
  })
}

/**
 * 更新字典
 * @param data
 */
export function updateJob(data) {
  return request({
    url: '/api/sys/job/update',
    method: 'post',
    data
  })
}
