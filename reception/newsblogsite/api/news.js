import request from '@/utils/request'

const GroupName = 'news'
const ApiName = 'news'

export default {
  searchPage (news, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: news
    })
  },
  mySearchPage (news, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/mySearch/${page}/${size}`,
      method: 'post',
      data: news
    })
  },
  findById (newsId) {
    return request({
      url: `/${GroupName}/${ApiName}/${newsId}`,
      method: 'get'
    })
  },
  getLastTop5 (uid) {
    return request({
      url: `/${GroupName}/${ApiName}/getLastTop5/${uid}`,
      method: 'get'
    })
  },
  collect (newsId) {
    return request({
      url: `/${GroupName}/${ApiName}/collect/${newsId}`,
      method: 'post'
    })
  },
  deleteCollect (newsId) {
    return request({
      url: `/${GroupName}/${ApiName}/collect/${newsId}`,
      method: 'delete'
    })
  },
  isCollected (newsId) {
    return request({
      url: `/${GroupName}/${ApiName}/isCollected/${newsId}`,
      method: 'get'
    })
  },
  userCollected () {
    return request({
      url: `/${GroupName}/${ApiName}/user/collectedList`,
      method: 'get'
    })
  },
  newsSetDeath (newsId, value) {
    return request({
      url: `/${GroupName}/${ApiName}/death/${newsId}/${value}`,
      method: 'put'
    })
  },
  newsSetTop (newsId, value) {
    return request({
      url: `/${GroupName}/${ApiName}/top/${newsId}/${value}`,
      method: 'put'
    })
  },
  newsSetPublic (newsId, value) {
    return request({
      url: `/${GroupName}/${ApiName}/public/${newsId}/${value}`,
      method: 'put'
    })
  },
  newsUpdate (newsId, value, name) {
    if (name === 'death') {
      return this.newsSetDeath(newsId, value)
    } else if (name === 'top') {
      return this.newsSetTop(newsId, value)
    } else {
      return this.newsSetPublic(newsId, value)
    }
  },
  save (news) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: news
    })
  },
  addvisits (newsId) {
    return request({
      url: `/${GroupName}/${ApiName}/visits/${newsId}`,
      method: 'put'
    })
  }
}
