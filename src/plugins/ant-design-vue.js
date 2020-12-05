import Vue from 'vue'
import {
  Layout,
} from 'ant-design-vue'

console.log(Layout)

Vue.component(Layout.name, Layout)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Sider.name, Layout.Sider)
