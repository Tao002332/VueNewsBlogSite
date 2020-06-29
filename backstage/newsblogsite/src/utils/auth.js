import Cookies from 'js-cookie'

const TokenKey = 'adminTokenKey'
const RolesKey = 'rolesKey'

export function getAdmin() {
  return {
    token: Cookies.get(TokenKey),
    rules: Cookies.get(RolesKey)
  }
}

export function setAdmin(token, roles) {
  Cookies.set(TokenKey, token)
  Cookies.set(RolesKey, roles)
}

export function removeAdmin() {
  Cookies.remove(TokenKey)
  Cookies.remove(RolesKey)
}
