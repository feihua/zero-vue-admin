import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sys/role/list',
    method: 'post',
    data: query
  })
}

export function deleteRole(id) {
  return request({
    url: '/api/sys/role/delete' + id,
    method: 'post',
    data:id
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
    url: '/api/sys/role/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/api/sys/role/update',
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
