import request from '@/utils/request'

/**
 * 查询所有角色
 * @param query
 */
export function fetchList(query) {
  return request({
    url: '/userRole/list',
    method: 'post',
    data: query
  })
}
