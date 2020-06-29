import request from '@/utils/request'

const GroupName = 'news'
const ApiName = 'channel'
export default {
  searchPage(page, size, searchChannel) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchChannel
    })
  },
  search(searchChannel) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: searchChannel
    })
  },
  getList() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  findById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  update(channelId, channel) {
    if (channelId === null || channelId === '') {
      return this.save(channel)
    }
    return request({
      url: `/${GroupName}/${ApiName}/${channelId}`,
      method: 'put',
      data: channel
    })
  },
  save(channel) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: channel
    })
  }
}
