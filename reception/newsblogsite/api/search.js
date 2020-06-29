import request from '@/utils/request'

const GroupName = 'search'
const ApiName = 'search'

export default {
  searchPage (search, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: search
    })
  }
}
