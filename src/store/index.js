import { createStore } from 'vuex'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
// import { applyToken } from '@/service/AuthenticatedUser.js'
// import { useCookies } from 'vue3-cookies'

// const {cookies} = useCookies()

const apiURL = 'http://localhost:3001/'

export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    product: null,
    recentProducts: null
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value
    },
    setUser(state, value) {
      state.user = value
    },
    setProducts(state, value) {
      state.products = value
    },
    setProduct(state, value) {
      state.product = value
    },
    setRecentProducts(state, value) {
      state.recentProducts = value
    }
  },
  actions: {
    async recentProducts(context) {
      try {
        const {results, msg} = await (await axios.get(`${apiURL}Products/recent`)).data
        console.log(results);
        if (results) {
          context.commit('setRecentProducts', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    }
  },
  modules: {
  }
})
