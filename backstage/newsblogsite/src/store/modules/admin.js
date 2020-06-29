import { login, getInfo } from '@/api/admin'
import { getAdmin, setAdmin, removeAdmin } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getAdmin().token,
  roles: getAdmin().rules,
  loginName: '',
  stateId: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGINNAME: (state, loginName) => {
    state.loginName = loginName
  },
  SET_STATEID: (state, stateId) => {
    state.stateId = stateId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: loginName.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_ROLES', data.roles)
        setAdmin(data.token, data.roles)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { loginName, state } = data

        commit('SET_LOGINNAME', loginName)
        commit('SET_STATEID', state)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', '')
    removeAdmin()
    resetRouter()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', '')
      removeAdmin()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

