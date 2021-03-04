import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sys/sysLog/list',
    method: 'post',
    data: query
  })
}

export function deleteSysLogin(id) {
  return request({
    url: '/api/sys/sysLog/delete',
    method: 'post',
    data: id
  })
}
