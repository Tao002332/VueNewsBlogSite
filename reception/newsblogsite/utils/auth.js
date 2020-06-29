import Cookies from 'js-cookie'

const TokenKey = 'userTokenKey'
export function getToken () {
  return {
    token: Cookies.get(TokenKey)
  }
}
export function setToken (token) {
  Cookies.set(TokenKey, token, { expires: 60 })
}

export function removeToken () {
  Cookies.remove(TokenKey)
}
