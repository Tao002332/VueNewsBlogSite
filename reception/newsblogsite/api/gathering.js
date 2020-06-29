import request from '@/utils/request'

const GroupName = 'gathering'
const ApiName = 'gathering'

export default {
  searchPage (gathering, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: gathering
    })
  },
  findById (gatheringId) {
    return request({
      url: `/${GroupName}/${ApiName}/${gatheringId}`,
      method: 'get'
    })
  }
}
