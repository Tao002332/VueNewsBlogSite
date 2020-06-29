import request from '@/utils/request'

const GroupName = 'news'
const ApiName = 'share'
export default {
  searchPage(page, size, searchShare) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchShare
    })
  },
  search(searchShare) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: searchShare
    })
  },
  getList() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  findById(shareId) {
    return request({
      url: `/${GroupName}/${ApiName}/${shareId}`,
      method: 'get'
    })
  },
  examine(shareId) {
    return request({
      url: `/${GroupName}/${ApiName}/examine/${shareId}`,
      method: 'put'
    })
  },
  deleteById(shareId) {
    return request({
      url: `/${GroupName}/${ApiName}/${shareId}`,
      method: 'delete'
    })
  }
}
