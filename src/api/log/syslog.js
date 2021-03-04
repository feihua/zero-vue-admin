import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sys/sysLog/list',
    method: 'post',
    data: query
  })
}

