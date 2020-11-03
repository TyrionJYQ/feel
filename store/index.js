import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from "vuex/dist/logger";
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		openid: null,
		buttonType: 0,
		list: Object.create(null), //选中清单
		listData: [], // 所有清单
		todoList: [], // 所有待办任务
	},
	mutations,
	actions,
	plugins: [createLogger()]
})

export default store
