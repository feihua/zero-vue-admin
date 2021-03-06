import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sys/dept/list',
    method: 'post',
    data: query
  })
}

export function deleteDept(id) {
  return request({
    url: '/api/sys/dept/delete',
    method: 'post',
    data: {id:id}
  })
}

export function createDept(data) {
  return request({
    url: '/api/sys/dept/add',
    method: 'post',
    data
  })
}

export function updateDept(data) {
  return request({
    url: '/api/sys/dept/update',
    method: 'post',
    data
  })
}
