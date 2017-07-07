<template>
	
	<div id="cinema">
		<div class="cinema-header">
			<span>影院</span>
			<i class="iconfont" v-show="searchshow">&#xe624;</i>
		</div>
	
		<category :category="categorydata"></category>
		
		<div class="cinema-banner">
			<mt-swipe :auto="2000" :showIndicators="false">
			  <mt-swipe-item >
			  	  <img src="http://mall.s.maizuo.com/dd644b9ba25e31ed44352e6a57e8fd11.jpg" />
			  </mt-swipe-item>
			    <mt-swipe-item >
			  	  <img src="http://mall.s.maizuo.com/17e58e7b47625fab5afdb4c184977d38.jpg" />
			  </mt-swipe-item>
			    <mt-swipe-item >
			  	  <img src="http://mall.s.maizuo.com/7496c1c0a84d1eede6c1579b22c8a567.jpg" />
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		
		<list :data="data"></list>
	
	</div>
	
</template>

<script>
	import Api from "../../common/api.js"
	import Vue from "vue"
	import { Swipe , SwipeItem } from "mint-ui"
	import list from "../../common/cinemalist.vue"
	import category from "../../common/cinemacategory.vue"
	import middle from "../../common/middle.js"
	Vue.component(Swipe.name, Swipe)
	Vue.component(SwipeItem.name,  SwipeItem)
	
	export default{
		data(){
			return {
				searchshow:true,
				data : [],
				categorydata : []
			}
		},
		created(){
			let time = (new Date()).getTime();
			this.$http.get(`${Api.cinemaApi}?__t=${time}`)
			.then((response)=>{
				this.data = response.data.data.cinemas.splice(0,50)
				let datas = response.data.data.cinemas;
				let arr = [];
				let obj={};
			 	datas.map((item,index)=>{
				 	if(obj[item.district.name] == undefined){
				 		obj[item.district.name] = 1;
				 		let obj1 = {};
				 		obj1.name= item.district.name;
				 		obj1.data = [];
				 		obj1.data.push(item)
				 		arr.push(obj1)
				 	}
				 	else{
				 		arr.map((item1,index1)=>{
				 			if(item.district.name == item1.name){
				 				item1.data.push(item)
				 			}
				 		})
				 	}
				})
			 	
			 	this.categorydata = arr;
			}).catch((error)=>{
				console.log(error)
			})
		},
		mounted(){
			middle.$on("changedata2",(index)=>{
				console.log("自定义2")
				if(index !="" ){
					this.data = this.categorydata[index].data;
				}
			})
			middle.$on("searchshow2",()=>{
				this.searchshow = !this.searchshow;
			})
		},
		components:{
			list,			
			category
		}
	}
</script>

<style>
	#cinema{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:1.77rem;
	}
	#cinema .cinema-header{
		padding:0 0.4rem;
		display:flex;
		align-items: center;
		justify-content: space-between;
		height:1rem;
		border-bottom: 1px solid #eee;
		z-index:2;
	}
	#cinema .cinema-header span{
		font-size:0.6rem;
		line-height:1rem ;
	}
	#cinema .cinema-header i{
		font-size:0.6rem;
		line-height: 1rem;
		color:#20B4D2;
	}
	#cinema p {
		font-size:0.5rem;
	}
	
</style>