import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		openid: null,
		buttonType: 0
	},
	mutations,
  actions,
})

export default store
