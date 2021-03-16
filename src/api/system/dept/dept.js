import request from '@/utils/request'

/**
 * 查询机构
 * @param query
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
 */
export function updateDept(data) {
  return request({
    url: '/api/sys/dept/update',
    method: 'post',
    data
  })
}
