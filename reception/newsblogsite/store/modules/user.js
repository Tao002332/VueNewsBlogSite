import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  nickname: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then((response) => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit }, token) {
    return new Promise((resolve, reject) => {
      getInfo(token).then((response) => {
        const { data } = response
        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }
        const { nickname, avatar } = data
        commit('SET_NICKNAME', nickname)
        commit('SET_AVATAR', avatar)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_NICKNAME', '')
    commit('SET_AVATAR', '')
    removeToken()
    sessionStorage.clear()
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_NICKNAME', '')
      commit('SET_AVATAR', '')
      removeToken()
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
