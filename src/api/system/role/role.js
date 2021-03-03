import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/role/list',
    method: 'post',
    data: query
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/delete/' + id,
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

export function createRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}

export function updateRoleResource(data) {
  return request({
    url: '/roleResources/updateRoleResource',
    method: 'post',
    data
  })
}

export function getRoleresources(id) {
  return request({
    url: '/roleResources/find/' + id,
    method: 'get'
  })
}
