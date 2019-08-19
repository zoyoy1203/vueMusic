import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
//显示修改日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
//由于有性能损耗，只用于开发，上线关闭
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  //严格模式，检测state的修改是否来源于mutation,不是就会报警告
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
