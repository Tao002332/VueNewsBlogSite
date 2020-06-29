import request from '@/utils/request'

const GroupName = 'news'
const ApiName = 'column'

export default {
  searchPage (column, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: column
    })
  },
  mySearchPage (column, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/mySearch/${page}/${size}`,
      method: 'post',
      data: column
    })
  },
  findById (columnId) {
    return request({
      url: `/${GroupName}/${ApiName}/${columnId}`,
      method: 'get'
    })
  },
  apply (column) {
    return request({
      url: `/${GroupName}/${ApiName}/apply`,
      method: 'post',
      data: column
    })
  }
}
