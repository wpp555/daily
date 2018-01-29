// 配置vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入相关js
import daily from './daily'
import two from './two'

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        daily,
        two,
    }
})