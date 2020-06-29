import request from '@/utils/request'

const GroupName = 'base'
const ApiName = 'city'

export default {
  searchPage(page, size, searchCity) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchCity
    })
  },
  search(searchCity) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: searchCity
    })
  }
}
