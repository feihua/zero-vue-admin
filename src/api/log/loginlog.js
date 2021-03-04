import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sys/loginLog/list',
    method: 'post',
    data: query
  })
}

export function deleteUser(id) {
  return request({
    url: '/api/sys/loginLog/delete',
    method: 'post',
    data: id
  })
}
