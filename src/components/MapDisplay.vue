<template>
  <div class="map-display">
    <ASpin
      v-if="!isLoaded"
      class="map-display__loader"
      size="large"
    />
    <MglMap
      v-show="isLoaded"
      :access-token="$options.accessToken"
      :attribution-control="false"
      data-cy="map-display"
      :map-style="$options.mapStyle"
      :center="center"
      :zoom="14"
      @load="handleMapLoad"
    >
      <MglMarker
        v-for="feature in filteredFeatures"
        :key="feature.properties.id"
        :coordinates="feature.geometry.coordinates"
        :color="feature.properties.color"
        data-cy="map-display__marker"
      >
        <MglPopup>
          <dl>
            <dt>Title</dt>
            <dd>{{ feature.properties.project.Title }}</dd>
            <template v-for="filter in filterConfigKeys">
              <dt :key="`${getFilterKey(filter)}.dt`">
                {{ getFilterKey(filter) }}
              </dt>
              <dd :key="`${getFilterKey(filter)}.dd`">
                {{ feature.properties.project[getFilterKey(filter)] }}
              </dd>
            </template>
          </dl>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import MapBox from 'mapbox-gl'
import {
  MglMap,
  MglMarker,
  MglPopup,
} from 'vue-mapbox'

import filterConfigMixin from '@/mixins/filterConfigMixin'

export default {
  name: 'MapDisplay',

  accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
  mapStyle: 'mapbox://styles/mapbox/light-v10',

  mixins: [
    filterConfigMixin,
  ],

  components: {
    MglMap,
    MglMarker,
    MglPopup,
  },

  data () {
    return {
      center: [0, 0],
      isLoaded: false,
      mapbox: null,
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
    handleMapLoad ({ map, component }) {
      this.isLoaded = true
      this.$nextTick(() => {
        map.resize()
      })
    },
  },
}
</script>

<style lang="scss" scoped>

.map-display {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/deep/ .mapboxgl {
  &-canvas:focus,
  &-popup-close-button:focus { outline: none }
}

</style>
