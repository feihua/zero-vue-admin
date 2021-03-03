import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/resources/list',
    method: 'post',
    data: query
  })
}

export function deleteResources(id) {
  return request({
    url: '/resources/delete/' + id,
    method: 'get'
  })
}

export function fetchResources(id) {
  return request({
    url: '/resources/find/detail' + id,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createResources(data) {
  return request({
    url: '/resources/add',
    method: 'post',
    data
  })
}

export function updateResources(data) {
  return request({
    url: '/resources/update',
    method: 'post',
    data
  })
}
