import request from '@/utils/request'

/**
 *查询会员地址列表
 * @param query
 */
export function queryMemberAddressList(query) {
  return request({
    url: '/api/member/address/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除会员地址
 * @param id
 */
export function deleteMemberAddress(data) {
  return request({
    url: '/api/member/address/delete',
    method: 'post',
    data
  })
}

/**
 *创建会员地址
 * @param data
 */
export function createMemberAddress(data) {
  return request({
    url: '/api/member/address/add',
    method: 'post',
    data
  })
}

/**
 * 更新会员地址
 * @param data
 */
export function updateMemberAddress(data) {
  return request({
    url: '/api/member/address/update',
    method: 'post',
    data
  })
}
