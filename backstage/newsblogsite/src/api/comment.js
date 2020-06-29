import request from '@/utils/request'

const GroupName = 'comment'
const ApiName = 'comment'
export default {
  searchPage(page, size, searchComment) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchComment
    })
  },
  search(searchComment) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: searchComment
    })
  },
  getList() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  findById(commentId) {
    return request({
      url: `/${GroupName}/${ApiName}/${commentId}`,
      method: 'get'
    })
  },
  examine(commentId) {
    return request({
      url: `/${GroupName}/${ApiName}/examine/${commentId}`,
      method: 'put'
    })
  },
  deleteById(commentId) {
    return request({
      url: `/${GroupName}/${ApiName}/${commentId}`,
      method: 'delete'
    })
  }
}
