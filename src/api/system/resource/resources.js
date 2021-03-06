import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sys/menu/list',
    method: 'post',
    data: query
  })
}

export function deleteResources(id) {
  return request({
    url: '/api/sys/menu/delete/',
    method: 'post',
    data: {id:id}
  })
}

export function createResources(data) {
  return request({
    url: '/api/sys/menu/add',
    method: 'post',
    data
  })
}

export function updateResources(data) {
  return request({
    url: '/api/sys/menu/update',
    method: 'post',
    data
  })
}
