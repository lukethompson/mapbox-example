import Vue from 'vue'
import {
  Divider,
  Form,
  Layout,
  Select,
  Slider,
} from 'ant-design-vue'
import antInputDirective from 'ant-design-vue/es/_util/antInputDirective'

Vue.component(Divider.name, Divider)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Layout.name, Layout)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Slider.name, Slider)

Vue.use(antInputDirective)
