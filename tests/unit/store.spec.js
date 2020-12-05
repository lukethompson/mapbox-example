import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

import { filterConfig } from '@/config'
import { storeConfig } from '@/store'

const factory = (mockState) => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = cloneDeep(storeConfig)
  if (mockState) store.state = mockState
  return new Vuex.Store(store)
}

const createMockFeature = (project) => ({ properties: { project } })

describe('mutations', () => {
  describe('setFilter', () => {
    it('can initialize a new filter', () => {
      const store = factory()
      store.commit('setFilter', { filter: 'category', value: null })
      expect(store.state.filters.category).toBe(null)
    })

    it('can update the value of a filter', () => {
      const store = factory()
      store.commit('setFilter', { filter: 'category', value: null })
      const value = 'Test Category'
      store.commit('setFilter', { filter: 'category', value })
      expect(store.state.filters.category).toBe(value)
    })
  })

  describe('setFilterOptions', () => {
    it('can set the filterOptions in the state', () => {
      const store = factory()
      store.commit('setFilterOptions', { category: ['Test Category 1', 'Test Category 2'] })
      expect(store.state.filterOptions).toEqual({ category: ['Test Category 1', 'Test Category 2'] })
    })
  })
})

describe('actions', () => {
  describe('initFilterOptions', () => {
    it('creates a filter option for each item in the config', () => {
      const store = factory()
      store.dispatch('initFilterOptions')
      expect(Object.keys(store.state.filterOptions)).toEqual(Object.keys(filterConfig))
    })

    it('sets a unqiue array of all the features filter values for select filters', () => {
      const mockGeoJsonFeatures = [
        createMockFeature({ Category: 'Sample category 1' }),
        createMockFeature({ Category: 'Sample category 1' }),
        createMockFeature({ Category: 'Sample category 2' }),
        createMockFeature({ Category: 'Sample category 3' }),
      ]
      const store = factory({ geoJsonFeatures: mockGeoJsonFeatures })
      store.dispatch('initFilterOptions')
      expect(store.state.filterOptions.category).toEqual([
        'Sample category 1',
        'Sample category 2',
        'Sample category 3',
      ])
    })

    it('sets an array containing the smallest and largest value of all the feature filter values for range filter', () => {
      const mockGeoJsonFeatures = [
        createMockFeature({ Value: 5000 }),
        createMockFeature({ Value: 1000 }),
        createMockFeature({ Value: 3000 }),
        createMockFeature({ Value: 8000 }),
      ]
      const store = factory({ geoJsonFeatures: mockGeoJsonFeatures })
      store.dispatch('initFilterOptions')
      expect(store.state.filterOptions.value).toEqual([
        1000,
        8000,
      ])
    })
  })

  describe('initFilters', () => {
    it('creates a key in the filters state for each filter in the filterConfig', () => {
      const store = factory()
      store.dispatch('initFilters')
      expect(Object.keys(store.state.filters)).toEqual(Object.keys(filterConfig))
    })

    it('sets each filter to null', () => {
      const store = factory()
      store.dispatch('initFilters')
      expect(Object.values(store.state.filters)).toEqual(Object.keys(filterConfig).map(filter => null))
    })
  })
})

describe('getters', () => {
  describe('filteredFeatures', () => {
    it('returns filtered features based on select filters', () => {
      const store = factory({
        geoJsonFeatures: [
          createMockFeature({ Category: 'Sample category 1' }),
          createMockFeature({ Category: 'Sample category 1' }),
          createMockFeature({ Category: 'Sample category 2' }),
          createMockFeature({ Category: 'Sample category 3' }),
        ],
        filters: { category: 'Sample category 1' },
      })
      expect(store.getters.filteredFeatures).toEqual([
        createMockFeature({ Category: 'Sample category 1' }),
        createMockFeature({ Category: 'Sample category 1' }),
      ])
    })

    it('returns filtered features based on "range" filters', () => {
      const store = factory({
        geoJsonFeatures: [
          createMockFeature({ Value: 500 }),
          createMockFeature({ Value: 4000 }),
          createMockFeature({ Value: 2000 }),
          createMockFeature({ Value: 5000 }),
        ],
        filters: { value: [1000, 4000] },
      })
      expect(store.getters.filteredFeatures).toEqual([
        createMockFeature({ Value: 4000 }),
        createMockFeature({ Value: 2000 }),
      ])
    })

    it('returns filtered features based on multiple filters', () => {
      const store = factory({
        geoJsonFeatures: [
          createMockFeature({ Category: 'Sample category 1', Value: 500 }),
          createMockFeature({ Category: 'Sample category 1', Value: 4000 }),
          createMockFeature({ Category: 'Sample category 2', Value: 2000 }),
          createMockFeature({ Category: 'Sample category 3', Value: 5000 }),
        ],
        filters: { category: 'Sample category 1', value: [1000, 4000] },
      })
      expect(store.getters.filteredFeatures).toEqual([
        createMockFeature({ Category: 'Sample category 1', Value: 4000 }),
      ])
    })
  })
})
