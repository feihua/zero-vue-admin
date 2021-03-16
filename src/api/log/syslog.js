import request from '@/utils/request'

/**
 * 查询系统日志
 * @param query
 */
export function querySysLogList(query) {
  return request({
    url: '/api/sys/sysLog/list',
    method: 'post',
    data: query
  })
}

/**
 * 删除系统日志
 * @param id
 */
export function deleteSysLogin(data) {
  return request({
    url: '/api/sys/sysLog/delete',
    method: 'post',
    data
  })
}
