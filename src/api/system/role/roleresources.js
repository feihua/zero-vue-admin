import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/roleResources/list',
    method: 'post',
    data: query
  })
}

export function fetchRoleresources(id) {
  return request({
    url: '/roleResources/find/detail/' + id,
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

export function createRoleresources(data) {
  return request({
    url: '/roleResources/add',
    method: 'post',
    data
  })
}

export function updateRoleresources(data) {
  return request({
    url: '/roleResources/update',
    method: 'post',
    data
  })
}
