import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sys/loginLog/list',
    method: 'post',
    data: query
  })
}

