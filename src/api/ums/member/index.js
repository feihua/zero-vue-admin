import request from '@/utils/request'

/**
 *查询会员列表
 * @param query
 */
export function queryMemberList(query) {
  return request({
    url: '/api/member/member/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除会员
 * @param id
 */
export function deleteMember(data) {
  return request({
    url: '/api/member/member/delete',
    method: 'post',
    data
  })
}

/**
 *创建会员
 * @param data
 */
export function createMember(data) {
  return request({
    url: '/api/member/member/add',
    method: 'post',
    data
  })
}

/**
 * 更新会员
 * @param data
 */
export function updateMember(data) {
  return request({
    url: '/api/member/member/update',
    method: 'post',
    data
  })
}
