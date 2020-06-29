import request from '@/utils/request'

const GroupName = 'news'
const ApiName = 'column'
export default {
  searchPage(page, size, searchColumn) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchColumn
    })
  },
  search(searchColumn) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: searchColumn
    })
  },
  getList() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  findById(columnId) {
    return request({
      url: `/${GroupName}/${ApiName}/${columnId}`,
      method: 'get'
    })
  },
  examine(columnId) {
    return request({
      url: `/${GroupName}/${ApiName}/examine/${columnId}`,
      method: 'put'
    })
  },
  deleteById(columnId) {
    return request({
      url: `/${GroupName}/${ApiName}/${columnId}`,
      method: 'delete'
    })
  }
}
