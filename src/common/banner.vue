<template>
	<div class="banner">
		<mt-swipe :auto="2000" :prevent="false">
		  <mt-swipe-item v-for="(item,index) in listdata" key="index">
		  	  <img :src="item.imageUrl" />
		  </mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	import Api from "./api.js"
	import Vue from "vue"
	import { Swipe , SwipeItem } from "mint-ui"
	Vue.component(Swipe.name, Swipe)
	Vue.component(SwipeItem.name,  SwipeItem)
	export default{
		data(){
			return{
				listdata : []
			}
		},
		created(){
			this.$http.get(`${Api.bannerApi}`)		
			.then((response)=>{
				this.listdata = response.data.data.billboards
			}).catch(function(error){
				console.log(error)
			})					
		}
	}
</script>

<style>
	.banner{
		width:100%;
		height:4rem;
	}
</style>