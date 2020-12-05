<template>
  <MglMap
    :access-token="$options.accessToken"
    :attribution-control="false"
    :map-style="$options.mapStyle"
    :center="center"
    :zoom="14"
    @load="onMapLoad"
  >
    <MglMarker
      v-for="feature in filteredFeatures"
      :key="feature.properties.id"
      :coordinates="feature.geometry.coordinates"
      :color="feature.properties.color"
    >
      <MglPopup>
        {{ feature.properties.project.Title }}
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>

<script>
import { mapGetters } from 'vuex'

import MapBox from 'mapbox-gl'
import {
  MglMap,
  MglMarker,
  MglPopup,
} from 'vue-mapbox'

export default {
  name: 'MapDisplay',

  accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
  mapStyle: 'mapbox://styles/mapbox/light-v10',

  components: {
    MglMap,
    MglMarker,
    MglPopup,
  },

  data () {
    return {
      mapbox: null,
      center: [0, 0],
    }
  },

  computed: {
    ...mapGetters([
      'filteredFeatures',
    ]),
  },

  created () {
    this.mapbox = MapBox
    this.center = this.getCenterCoords()
  },

  methods: {
    // Find the average of all given coordinates
    getCenterCoords () {
      const totalCoords = this.filteredFeatures.reduce((acc, feature) => {
        acc[0] += feature.geometry.coordinates[0]
        acc[1] += feature.geometry.coordinates[1]
        return acc
      }, [0, 0])
      const longAvg = totalCoords[0] / this.filteredFeatures.length
      const latAvg = totalCoords[1] / this.filteredFeatures.length
      return [longAvg, latAvg]
    },
    onMapLoad ({ map, component }) {
      map.resize()
    },
  },
}
</script>

<style lang="scss">

.mapboxgl {
  &-canvas:focus,
  &-popup-close-button:focus { outline: none }
}

</style>
