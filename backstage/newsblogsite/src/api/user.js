import request from '@/utils/request'

const GroupName = 'user'
const ApiName = 'user'
export default {
  searchPage(page, size, searchUser) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchUser
    })
  },
  examine(userId) {
    return request({
      url: `/${GroupName}/${ApiName}/examine/${userId}`,
      method: 'put'
    })
  },
  findById(userId) {
    return request({
      url: `/${GroupName}/${ApiName}/${userId}`,
      method: 'get'
    })
  },
  deleteById(userId) {
    return request({
      url: `/${GroupName}/${ApiName}/${userId}`,
      method: 'delete'
    })
  },
  update(userId, user) {
    return request({
      url: `/${GroupName}/${ApiName}/${userId}`,
      method: 'put',
      data: user
    })
  },
  stateChange(userId, stateId) {
    return request({
      url: `/${GroupName}/${ApiName}/state/${userId}/${stateId}`,
      method: 'put'
    })
  }
}
