import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import store from '@/store/index'
//解决vant样式无法覆盖的问题
import '../static/restVant.css'
Vue.use(Cube)

// 兼容 ES6
import 'babel-polyfill'
// 查看大图
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
var options={
  fullscreenEl: false, //关闭全屏按钮
  isClickableElement : function(el){
    return el.tagName === 'A' || el.tagName === 'IMG';
  },
  tapToClose: true,
}
Vue.use(preview, options)

//引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'

import '@vant/touch-emulator'

Vue.use(Vant)
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    // error:'./static/error.png',
    // loading:'./static/loading.gif'
})

//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//引入字体图标
import '@/assets/icon/iconfont.css'

//引入拖拽工具
import VueDND from 'awe-dnd'
Vue.use(VueDND)

//引入vConsole
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
Vue.use(vConsole)

//引入表格组件
import 'vue-easytable/libs/themes-base/index.css'			// 引入样式
import {VTable, VPagination} from 'vue-easytable'			// 导入 table 和 分页组件
Vue.component(VTable.name, VTable)							// 注册到全局
Vue.component(VPagination.name, VPagination)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
