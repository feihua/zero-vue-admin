import request from '@/utils/request'

/**
 * 根据角色id查询所以角色和它拥有的角色
 * @param id
 */
export function fetchList(id) {
  return request({
    url: '/api/sys/role/queryMenuByRoleId',
    method: 'post',
    data: {id:id}
  })
}

/**
 * 更新角色菜单
 * @param data
 */
export function updateRoleMenu(data) {
  return request({
    url: '/api/sys/role/updateRoleMenu',
    method: 'post',
    data
  })
}

