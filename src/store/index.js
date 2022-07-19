import Vue from 'vue'
import Vuex from 'vuex'
import VuexP from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexP({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: {},
    sCity: {
      label: '北京',
      value: 'AREA|88cff55c-aaa4-e2e0'
    },
    floor: [],
    characteristic: [],
    oriented: [],
    roomType: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setCity (state, city) {
      state.sCity.label = city.label,
        state.sCity.value = city.value
    },
    setFloor (state, floor) {
      state.floor = floor
    },
    setCha (state, cha) {
      state.characteristic = cha
    },
    setOri (state, ori) {
      state.oriented = ori
    },
    setRT (state, ren) {
      state.roomType = ren
    },

  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
