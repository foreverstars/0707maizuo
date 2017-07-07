<template>
	
	<div id="nowplaying">
		
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
			:autoFill="false" :bottomAllLoaded="!canloadMore" ref="loadmore" bottomPullText="加载更多">
			
			<Bannercom></Bannercom>
			<ul class="now-lists">
				
				<li v-for="(item,index) in listdata" @click="gofilm(item.id)">
					<img :src="item.cover.origin" />
					<div class="now-item-mid">
						<h2>{{item.name}}</h2>
						<p>{{item.intro}}</p>
						<p>{{item.cinemaCount}}家影院正在上映</p>
					</div>
					<div class="now-item-grade">{{item.grade}}</div>
				</li>
			
			</ul>
		</mt-loadmore>
	
	
	</div>

</template>

<script>
	import Bannercom from "../../common/banner.vue"
	import router from "../../router"
	import Api from "../../common/api.js"
	import { Loadmore } from "mint-ui"
	import Vue from "vue"
	Vue.component( Loadmore.name , Loadmore)
	export default{
		data(){
			return{
				listdata : [],
				page : 1,
				count : 7,
				canloadMore: true
			}
		},
		methods:{
			loadTop(){
				setTimeout(()=>{
					this.$refs.loadmore.onTopLoaded()
				},1000)
			},
			loadBottom(){
				setTimeout(()=>{
					this.page += 1;
					this.$http.get(`${Api.nowplayingApi}&page=${this.page}&count=${this.count}`)		
					.then((response)=>{
						this.listdata = this.listdata.concat(response.data.data.films)
					}).catch(function(error){
						console.log(error)
					})
					this.$refs.loadmore.onBottomLoaded();
					if(this.page >=9 ){
						this.canloadMore = false;
						return;
					}
				},1000)
			},
			gofilm(id){
				router.push('/movie/film/'+id);
				let wait = document.createElement("div");
				document.querySelector(".all").appendChild(wait);
				wait.className = "waitfor";
				wait.innerHTML = ` <div class="spinner">
  										<div class="dot1"></div>
  										<div class="dot2"></div>
									</div>`;
			}
		},
		created(){
			this.$http.get(`${Api.nowplayingApi}&page=${this.page}&count=${this.count}`)		
			.then((response)=>{
				this.listdata = response.data.data.films
			}).catch(function(error){
				console.log(error)
			})				
		},
		components:{
			Bannercom
		}
	}
</script>

<style>
	#nowplaying{
		width:100%;
		position:absolute;	
		overflow:auto;
		left:0;
		top:0;
		bottom:0;
	}
	#nowplaying .now-lists{
		width:100%
	}
	#nowplaying .now-lists li{
		margin:0.44rem 0.63rem 0.44rem 0.64rem;
		padding-bottom: 0.44rem;
		overflow: hidden;
		position:relative;
		border-bottom: 1px solid #eee;
	}
	#nowplaying .now-lists li img{
		display:block;
		width:1.85rem;
		height:2.54rem;
		float:left
	}
	#nowplaying .now-lists li .now-item-mid{
		float:left;
		width:6.41rem;
		margin-left: 0.56rem;
	}
	#nowplaying .now-lists li .now-item-mid h2{
		font-size:0.49rem;
		color:#000;
	}
	#nowplaying .now-lists li .now-item-mid p:nth-child(2){
		font-size:0.35rem;
		color:#787878;
		margin-top:0.44rem;
		margin-bottom: 0.58rem;
	}
	#nowplaying .now-lists li .now-item-mid p:nth-child(3){
		font-size:0.35rem;
		color:#bcbcbc;
	}
	#nowplaying .now-lists li .now-item-grade{
		float:right;
		color:#ff5000;
		font-size:0.4rem;
	}
	.mint-loadmore{
		width:100%;
		font-size:0.4rem;	
	}
	
</style>
