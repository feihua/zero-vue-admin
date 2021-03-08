import request from '@/utils/request'

/**
 *查询字典列表
 * @param query
 * @returns {AxiosPromise}
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
 * @returns {AxiosPromise}
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
 * @returns {AxiosPromise}
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
 * @returns {AxiosPromise}
 */
export function updateDict(data) {
  return request({
    url: '/api/sys/dict/update',
    method: 'post',
    data
  })
}
