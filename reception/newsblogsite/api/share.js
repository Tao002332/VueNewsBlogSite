import request from '@/utils/request'

const GroupName = 'news'
const ApiName = 'share'

export default {
  searchPage (share, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: share
    })
  },
  mySearchPage (share, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/mySearch/${page}/${size}`,
      method: 'post',
      data: share
    })
  },
  findById (shareId) {
    return request({
      url: `/${GroupName}/${ApiName}/${shareId}`,
      method: 'get'
    })
  },
  shareSetDeath (shareId, value) {
    return request({
      url: `/${GroupName}/${ApiName}/death/${shareId}/${value}`,
      method: 'put'
    })
  },
  shareSetTop (shareId, value) {
    return request({
      url: `/${GroupName}/${ApiName}/top/${shareId}/${value}`,
      method: 'put'
    })
  },
  shareSetPublic (shareId, value) {
    return request({
      url: `/${GroupName}/${ApiName}/public/${shareId}/${value}`,
      method: 'put'
    })
  },
  shareUpdate (shareId, value, name) {
    if (name === 'death') {
      return this.shareSetDeath(shareId, value)
    } else if (name === 'top') {
      return this.shareSetTop(shareId, value)
    } else {
      return this.shareSetPublic(shareId, value)
    }
  },
  save (share) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: share
    })
  },
  thumbup (shareId) {
    return request({
      url: `/${GroupName}/${ApiName}/thumbup/${shareId}`,
      method: 'put'
    })
  },
  addvisits (shareId) {
    return request({
      url: `/${GroupName}/${ApiName}/visits/${shareId}`,
      method: 'put'
    })
  }
}
