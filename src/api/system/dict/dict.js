import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sys/dict/list',
    method: 'post',
    data: query
  })
}

export function deleteDict(id) {
  return request({
    url: '/api/sys/dict/delete',
    method: 'post',
    data: id
  })
}


export function createDict(data) {
  return request({
    url: '/api/sys/dict/add',
    method: 'post',
    data
  })
}

export function updateDict(data) {
  return request({
    url: '/api/sys/dict/update',
    method: 'post',
    data
  })
}
