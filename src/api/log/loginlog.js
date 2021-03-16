import request from '@/utils/request'

/**
 * 查询登录日志
 * @param query
 */
export function queryLoginLogList(query) {
  return request({
    url: '/api/sys/loginLog/list',
    method: 'post',
    data: query
  })
}

/**
 * 删除登录日志
 * @param id
 */
export function deleteLoginlog(data) {
  return request({
    url: '/api/sys/loginLog/delete',
    method: 'post',
    data
  })
}
