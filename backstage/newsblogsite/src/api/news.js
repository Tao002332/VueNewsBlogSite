import request from '@/utils/request'

const GroupName = 'news'
const ApiName = 'news'
export default {
  searchPage(page, size, searchNews) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchNews
    })
  },
  search(searchNews) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: searchNews
    })
  },
  getList() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  findById(newsId) {
    return request({
      url: `/${GroupName}/${ApiName}/${newsId}`,
      method: 'get'
    })
  },
  examine(newsId) {
    return request({
      url: `/${GroupName}/${ApiName}/examine/${newsId}`,
      method: 'put'
    })
  },
  deleteById(newsId) {
    return request({
      url: `/${GroupName}/${ApiName}/${newsId}`,
      method: 'delete'
    })
  }
}
