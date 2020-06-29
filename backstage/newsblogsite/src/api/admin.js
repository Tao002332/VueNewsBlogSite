import request from '@/utils/request'

const GroupName = 'user'
const ApiName = 'admin'
export function login(data) {
  return request({
    url: `/${GroupName}/${ApiName}/login`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: `/${GroupName}/${ApiName}/info`,
    method: 'post',
    data: {
      token
    }
  })
}

export default {
  searchPage(page, size, searchAdmin) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchAdmin
    })
  },
  findById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  deleteById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'delete'
    })
  },
  save(admin) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: admin
    })
  },
  grant(id, level) {
    return request({
      url: `/${GroupName}/${ApiName}/grant/${id}/${level}`,
      method: 'put'
    })
  }
}
