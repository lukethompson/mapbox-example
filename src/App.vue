<template>
  <div id="app">
    <MapDisplay />
  </div>
</template>

<script>
import MapDisplay from '@/components/MapDisplay'

export default {
  name: 'App',
  components: {
    MapDisplay,
  },
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}
</style>
