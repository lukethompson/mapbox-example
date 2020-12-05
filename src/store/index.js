import Vue from 'vue'
import Vuex from 'vuex'

import { filterConfig } from '@/config'
import { features } from '@/data/testBlob'
import {
  FILTER_TYPE_RANGE,
  FILTER_TYPE_SELECT,
} from '@/constants'

Vue.use(Vuex)

export const storeConfig = {
  state: {
    geoJsonFeatures: features,
    filterOptions: {},
    filters: {},
  },
  mutations: {
    setFilter (state, { filter, value }) {
      Vue.set(state.filters, filter, value)
    },
    setFilterOptions (state, payload) {
      state.filterOptions = payload
    },
  },
  actions: {
    // Set filter options based on the feature data
    initFilterOptions: ({ state, commit }) => {
      const filters = Object.keys(filterConfig)
      // Reduce feature values into an object keyed by the filter
      const filterOptions = state.geoJsonFeatures.reduce((acc, { properties }) => {
        // For each of the filters update with the feature value
        filters.forEach((filter) => {
          const value = properties.project[filterConfig[filter].key]
          if (acc[filter]) acc[filter].push(value)
          else acc[filter] = [value]
        })
        return acc
      }, {})
      // Remove duplicates from each filterOptions array
      const filterOptionsUnique = Object.keys(filterOptions).reduce((acc, filter) => {
        const { type } = filterConfig[filter]
        acc[filter] = [...new Set(filterOptions[filter])]
        // Set the min and max values for range filters
        if (type === FILTER_TYPE_RANGE) {
          acc[filter] = [Math.min(...acc[filter]), Math.max(...acc[filter])]
        }
        return acc
      }, {})
      commit('setFilterOptions', filterOptionsUnique)
    },
    // Initialize state to hold selected filter values
    initFilters: ({ state, commit }) => {
      Object.keys(filterConfig)
        .forEach(filter => commit('setFilter', { filter }))
    },
  },
  getters: {
    filteredFeatures: (state) => {
      const activeFilters = Object.keys(state.filters)
        .filter(filter => state.filters[filter] !== undefined)
      return state.geoJsonFeatures.filter(({ properties }) =>
        activeFilters.every(filter => {
          const { key, type } = filterConfig[filter]
          const featureValue = properties.project[key]
          if (type === FILTER_TYPE_SELECT) {
            return featureValue === state.filters[filter]
          }
          if (type === FILTER_TYPE_RANGE) {
            return featureValue >= state.filters[filter][0] &&
              featureValue <= state.filters[filter][1]
          }
          return false
        }),
      )
    },
  },
}

export default new Vuex.Store(storeConfig)
