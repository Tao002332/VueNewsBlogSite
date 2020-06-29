import request from '@/utils/request'

const GroupName = 'news'
const ApiName = 'channel'

export default {
  search (channel) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: channel
    })
  },
  findById (channelId) {
    return request({
      url: `/${GroupName}/${ApiName}/${channelId}`,
      method: 'get'
    })
  }
}
