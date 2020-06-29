const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.admin.token,
  loginName: state => state.admin.loginName,
  stateId: state => state.admin.stateId,
  roles: state => state.admin.roles
}
export default getters
