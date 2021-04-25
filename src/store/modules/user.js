import { login, logout, getInfo } from '@/api/system/user/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import {tree} from "@/utils/utils";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    menus: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, avatar) => {
    state.menus = avatar
  }
}

const actions = {
  // user loginlog
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        const { token } = response
        commit('SET_TOKEN', "Bearer " + token)
        setToken("Bearer " + token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { name, avatar,menuTreeVue } = response

        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }

        // const { name, avatar,resources } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)

        // resources.push({
        //   path: '/404',
        //   component: '404',
        //   hidden: true
        // }, {
        //   path: '*',
        //   redirect: '/404',
        //   hidden: true
        // })

        commit('SET_MENUS', tree(menuTreeVue,0,'parentId'))
        resolve(menuTreeVue)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

