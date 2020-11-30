import Vue from 'vue'
import Vuex from 'vuex'

import { features } from '@/data/testBlob'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geoJsonFeatures: features,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    filteredFeatures: (state) => state.geoJsonFeatures,
  },
})
