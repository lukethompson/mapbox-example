<template>
  <div id="app">
    <ALayout class="app-layout">
      <Sidebar />
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
import Sidebar from '@/components/Sidebar'

export default {
  name: 'App',

  components: {
    MapDisplay,
    Sidebar,
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
