import request from '@/utils/request'

const GroupName = 'base'
const ApiName = 'label'

export default {
  searchPage(page, size, searchLabel) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: searchLabel
    })
  },
  findById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  recommend(labelId, value) {
    return request({
      url: `/${GroupName}/${ApiName}/recommend/${labelId}/${value}`,
      method: 'put'
    })
  },
  examine(labelId) {
    return request({
      url: `/${GroupName}/${ApiName}/examine/${labelId}`,
      method: 'put'
    })
  },
  deleteById(labelId) {
    return request({
      url: `/${GroupName}/${ApiName}/${labelId}`,
      method: 'delete'
    })
  }
}
