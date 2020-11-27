import request from '@/utils/request'

export function listChristian(query) {
  return request({
    url: '/christian/page',
    method: 'get',
    params: query
  })
}

// 新增角色
export function addChristian(data) {
  return request({
    url: '/christian',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateChristian(data) {
  return request({
    url: `/christian/${data.christianId}`,
    method: 'put',
    data
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

export function delChristianId(christianId) {
  return request({
    url: `/christian/${christianId}`,
    method: 'delete'
  })
}

export function createQrcode(christianId) {
  return request({
    url: `/christian/qrcode/${christianId}`,
    method: 'post'
  })
}

export function downloadQrcode(christianId) {
  return request({
    url: `/christian/qrcode/download/${christianId}`,
    method: 'get'
  })
}

// 导出角色
export function getChristianMeetingRecord(christianId) {
  return request({
    url: `/christian/${christianId}/meeting/page`,
    method: 'get',
  })
}
