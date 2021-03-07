import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: '/api/sys/role/queryMenuByRoleId',
    method: 'post',
    data: {id:id}
  })
}

export function updateRoleMenu(data) {
  return request({
    url: '/api/sys/role/updateRoleMenu',
    method: 'post',
    data
  })
}

