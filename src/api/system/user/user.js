import request from '@/utils/request'

// 根据用户名和密码登录
export function login(data) {
  return request({
    url: '/api/sys/user/login',
    method: 'post',
    data
  })
}

// 根据token获取用户信息
export function getInfo() {
  return request({
    url: '/api/sys/user/currentUser',
    method: 'get'
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户信息列表
export function fetchList(query) {
  return request({
    url: '/api/sys/user/list',
    method: 'post',
    data: query
  })
}

// 根据用户id获取用户信息
export function fetchUser(id) {
  return request({
    url: '/user/find/detail' + id,
    method: 'get'
  })
}

// 添加用户信息
export function createUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 更新用户信息
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

// 更新用户信息
export function updateUserRole(data) {
  return request({
    url: '/userRole/updateUserRole',
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/delete/'+id,
    method: 'get'
  })
}
