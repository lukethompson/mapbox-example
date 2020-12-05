import { filterConfig } from '@/config'

export default {
  computed: {
    filterConfigKeys () {
      return Object.keys(filterConfig)
    },
  },

  methods: {
    getFilterKey (filter) {
      return filterConfig[filter].key
    },
    getFilterType (filter) {
      return filterConfig[filter].type
    },
  },
}
