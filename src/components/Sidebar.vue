<template>
  <ALayoutSider
    class="sidebar"
    collapsed-width="0"
    breakpoint="lg"
  >
    <div class="sidebar__content">
      <h1 class="sidebar__heading">
        <img
          alt="MapApp logo"
          class="sidebar__logo"
          src="@/assets/logo.svg"
        />
        MapApp
      </h1>
      <ADivider />
      <h2 class="sidebar__sub-heading">
        Filters
      </h2>
      <AForm layout="vertical">
        <template v-for="filter in filters">
          <AFormItem
            :key="$options.filterConfig[filter].key"
            class="sidebar__form-item"
            :label="$options.filterConfig[filter].key"
          >
            <template v-if="$options.filterConfig[filter].type === $options.FILTER_TYPE_RANGE">
              <ASlider
                :default-value="filterOptions[filter]"
                :max="filterOptions[filter][1]"
                :min="filterOptions[filter][0]"
                range
                @change="handleChange($event, filter)"
              />
            </template>
            <template v-if="$options.filterConfig[filter].type === $options.FILTER_TYPE_SELECT">
              <ASelect
                allow-clear
                :placeholder="`Select ${$options.filterConfig[filter].key}`"
                show-search
                :value="filters[filter]"
                @change="handleChange($event, filter)"
              >
                <template v-for="option in filterOptions[filter]">
                  <ASelectOption
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </ASelectOption>
                </template>
              </ASelect>
            </template>
          </AFormItem>
        </template>
      </AForm>
    </div>
  </ALayoutSider>
</template>

<script>
import { mapState } from 'vuex'

import { filterConfig } from '@/config'
import {
  FILTER_TYPE_RANGE,
  FILTER_TYPE_SELECT,
} from '@/constants'

export default {
  name: 'Sidebar',

  filterConfig,

  FILTER_TYPE_RANGE,
  FILTER_TYPE_SELECT,

  computed: {
    ...mapState([
      'filterOptions',
      'filters',
    ]),
    filters () {
      return Object.keys(filterConfig)
    },
  },

  methods: {
    handleChange (value, filter) {
      this.$store.commit('setFilter', { filter, value })
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  $sidebar--font-color: #fff;

  background: linear-gradient(180deg, #32BFA2 0%, #235769 100%);

  &__content {
    max-height: 100%;
    overflow-y: auto;
    padding: 8px;
  }

  &__heading {
    display: flex;
    align-items: flex-end;
    font-size: 1.8rem;
    font-weight: bold;
    color: rgba(0, 0, 0, .65);
  }

  &__logo {
    width: 36px;
    margin-right: 8px;
  }

  &__sub-heading {
    font-size: .9rem;
    font-weight: bold;
    text-transform: uppercase;
    color: $sidebar--font-color;
    margin-bottom: 4px;
  }

  &__form-item {
    margin-bottom: 8px;

    /deep/ label {
      color: rgba($sidebar--font-color, .85);
    }
  }
}

</style>
