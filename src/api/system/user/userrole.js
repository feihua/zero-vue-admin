import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/userRole/list',
    method: 'post',
    data: query
  })
}

export function fetchUserRole(id) {
  return request({
    url: '/userRole/find/detail' + id,
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

export function createUserRole(data) {
  return request({
    url: '/userRole/add',
    method: 'post',
    data
  })
}

export function updateUserRole(data) {
  return request({
    url: '/userRole/update',
    method: 'post',
    data
  })
}
