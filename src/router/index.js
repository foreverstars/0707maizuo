import Vue from 'vue'
import Router from 'vue-router'
import Movie from "../components/movie/movie.vue"
import Cinema from "../components/cinema/cinema.vue"
import Show from "../components/show/show.vue"
import Store from "../components/store/store.vue"
import Mine from "../components/mine/mine.vue"
import Address from  "../components/movie/address.vue"
import Film from "../components/movie/film.vue"
import cinema from "../components/movie/gocinema.vue"

Vue.use(Router)

export default new Router({
  routes: [
  	{path : "/", component: Movie},
		{	name:"movie",path : "/movie", 
			component: Movie,
			children : [
					{ path : "address", component : Address},
					{ path : "film/:id",component : Film,
						children : [{name:"gocinema",path : "gocinema", component: cinema }]
					}
			]
		},
		{name : "cinema",path : "/cinema", component: Cinema},	 
		{name : "show",path : "/show", component: Show},	 
		{name : "store",path : "/store", component: Store},	 
		{name : "mine",path : "/mine", component: Mine}
  ]
})
