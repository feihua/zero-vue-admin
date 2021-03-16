import request from '@/utils/request'

/**
 *查询会员登录日志列表
 * @param query
 */
export function queryMemberLogList(query) {
  return request({
    url: '/api/member/loginlog/list',
    method: 'post',
    data: query
  })
}

/**
 *根据主键删除会员登录日志
 * @param data
 */
export function deleteMemberLog(data) {
  return request({
    url: '/api/member/loginlog/delete',
    method: 'post',
    data
  })
}

/**
 *创建会员登录日志
 * @param data
 */
export function createMemberLog(data) {
  return request({
    url: '/api/member/loginlog/add',
    method: 'post',
    data
  })
}

/**
 * 更新会员登录日志
 * @param data
 */
export function updateMemberLog(data) {
  return request({
    url: '/api/member/loginlog/update',
    method: 'post',
    data
  })
}
