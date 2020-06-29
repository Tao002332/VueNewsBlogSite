import request from '@/utils/request'

const GroupName = 'gathering'
const ApiName = 'gathering'

export default {
  searchPage(page, size, searchCity) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchCity
    })
  },
  findById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  getList() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  update(id, gathering) {
    if (id === null || id === '') {
      return this.save(gathering)
    }
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'put',
      data: gathering
    })
  },
  save(gathering) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: gathering
    })
  }
}
