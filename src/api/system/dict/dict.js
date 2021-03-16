import request from '@/utils/request'

/**
 *查询字典列表
 * @param query
 */
export function queryDictList(query) {
  return request({
    url: '/api/sys/dict/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除字典
 * @param id
 */
export function deleteDict(data) {
  return request({
    url: '/api/sys/dict/delete',
    method: 'post',
    data
  })
}

/**
 *创建字典
 * @param data
 */
export function createDict(data) {
  return request({
    url: '/api/sys/dict/add',
    method: 'post',
    data
  })
}

/**
 * 更新字典
 * @param data
 */
export function updateDict(data) {
  return request({
    url: '/api/sys/dict/update',
    method: 'post',
    data
  })
}
