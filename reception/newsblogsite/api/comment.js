import request from '@/utils/request'

const GroupName = 'comment'
const ApiName = 'comment'

export default {
  search (comment) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: comment
    })
  },
  save (comment) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: comment
    })
  }
}
