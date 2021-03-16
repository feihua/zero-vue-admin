import request from '@/utils/request'

/**
 *查询会员等级列表
 * @param query
 */
export function queryMemberLevelList(query) {
  return request({
    url: '/api/member/level/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除会员等级
 * @param id
 */
export function deleteMemberLevel(data) {
  return request({
    url: '/api/member/level/delete',
    method: 'post',
    data
  })
}

/**
 *创建会员等级
 * @param data
 */
export function createMemberLevel(data) {
  return request({
    url: '/api/member/level/add',
    method: 'post',
    data
  })
}

/**
 * 更新会员等级
 * @param data
 */
export function updateMemberLevel(data) {
  return request({
    url: '/api/member/level/update',
    method: 'post',
    data
  })
}
