import request from '@/utils/request'

// 查询角色列表
export function listMeeting(query) {
  return request({
    url: '/meeting/page',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getMeeting(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addMeeting(data) {
  return request({
    url: '/meeting',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateMeeting(data) {
  return request({
    url: `/meeting/${data.meetingId}`,
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delMeeting(meetingId) {
  return request({
    url: '/meeting/' + meetingId,
    method: 'delete'
  })
}

// 导出角色
export function exportRole(query) {
  return request({
    url: '/system/role/export',
    method: 'get',
    params: query
  })
}
