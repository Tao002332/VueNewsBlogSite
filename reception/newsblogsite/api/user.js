import request from '@/utils/request'

const GroupName = 'user'
const ApiName = 'user'

export function login (user) {
  return request({
    url: `/${GroupName}/${ApiName}/login`,
    method: 'post',
    data: user
  })
}
export function getInfo (token) {
  return request({
    url: `/${GroupName}/${ApiName}/info`,
    method: 'post',
    data: {
      token
    }
  })
}

export default {
  sendSms (mobile) {
    return request({
      url: `/${GroupName}/${ApiName}/sendSms`,
      method: 'post',
      data: {
        mobile
      }
    })
  },
  register (mobile, password, code) {
    return request({
      url: `/${GroupName}/${ApiName}/register/${code}`,
      method: 'post',
      data: {
        mobile,
        password
      }
    })
  },
  modifyPassword (mobile, password, code) {
    return request({
      url: `/${GroupName}/${ApiName}/modifyPassword/${code}`,
      method: 'post',
      data: {
        mobile,
        password
      }
    })
  },
  visitOtherById (uid) {
    return request({
      url: `/${GroupName}/${ApiName}/visitOther/${uid}`,
      method: 'get'
    })
  },
  saveInfo (user) {
    return request({
      url: `/${GroupName}/${ApiName}/saveInfo`,
      method: 'put',
      data: user
    })
  },
  getBlacklist () {
    return request({
      url: `/${GroupName}/${ApiName}/blacklist/myBlacklist`,
      method: 'get'
    })
  },
  getFanslist () {
    return request({
      url: `/${GroupName}/${ApiName}/fans/myFans`,
      method: 'get'
    })
  },
  getFollowlist () {
    return request({
      url: `/${GroupName}/${ApiName}/follow/myFollow`,
      method: 'get'
    })
  },
  deleteBlacklist (userId) {
    return request({
      url: `/${GroupName}/${ApiName}/blacklist/${userId}`,
      method: 'delete'
    })
  },
  saveBlacklist (userId) {
    return request({
      url: `/${GroupName}/${ApiName}/blacklist/${userId}`,
      method: 'post'
    })
  },
  deleteFollow (userId) {
    return request({
      url: `/${GroupName}/${ApiName}/follow/${userId}`,
      method: 'delete'
    })
  },
  saveFollow (userId) {
    return request({
      url: `/${GroupName}/${ApiName}/follow/${userId}`,
      method: 'post'
    })
  },
  isFollow (userId) {
    return request({
      url: `/${GroupName}/${ApiName}/isFollow/${userId}`,
      method: 'get'
    })
  }
}
