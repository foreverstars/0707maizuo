//store文件用于存储数据的仓库

import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

//城市信息
const cityModule = {
	namespaced : true,
	state : {
		name : "深圳"
	},
	mutations : {
		upDate(state,data){
			state.name = data
		}
	}
}


export default new Vuex.Store({
	modules : {
		"city"	: cityModule	
	}
})
