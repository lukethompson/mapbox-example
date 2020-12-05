<template>
  <div id="app">
    <ALayout class="app-layout">
      <ALayoutSider
        breakpoint="lg"
        collapsed-width="0"
      >
        <!-- TODO: Add sidebar -->
      </ALayoutSider>
      <ALayout>
        <ALayoutContent>
          <MapDisplay />
        </ALayoutContent>
      </ALayout>
    </ALayout>
  </div>
</template>

<script>
import MapDisplay from '@/components/MapDisplay'

export default {
  name: 'App',

  components: {
    MapDisplay,
  },

  created () {
    this.$store.dispatch('initFilterOptions')
    this.$store.dispatch('initFilters')
  },
}
</script>

<style lang="scss" scoped>
#app, .app-layout {
  height: 100%;
}
</style>
