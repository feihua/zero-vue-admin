import request from '@/utils/request'

/**
 * 查询机构
 * @param query
 * @returns {AxiosPromise}
 */
export function querDeptList(query) {
  return request({
    url: '/api/sys/dept/list',
    method: 'post',
    data: query
  })
}

/**
 * 删除机构
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteDept(id) {
  return request({
    url: '/api/sys/dept/delete',
    method: 'post',
    data: {id:id}
  })
}

/**
 * 创建机构
 * @param data
 * @returns {AxiosPromise}
 */
export function createDept(data) {
  return request({
    url: '/api/sys/dept/add',
    method: 'post',
    data
  })
}

/**
 * 更新机构
 * @param data
 * @returns {AxiosPromise}
 */
export function updateDept(data) {
  return request({
    url: '/api/sys/dept/update',
    method: 'post',
    data
  })
}
