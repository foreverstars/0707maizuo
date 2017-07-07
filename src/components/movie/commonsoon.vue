<template>
	<div id="commonsoon">
		<div>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
			:autoFill="false" :bottomAllLoaded="!canloadMore" ref="loadmore"  bottomPullText="加载更多">
			<Bannercom></Bannercom>
			
			<div class="soon-alllist" v-for="(item,index) in listdata">
				<p class="soon-alllist-title">{{item[0].premiereAt | bigtime }}</p>
				<ul class="now-lists">
					<li v-for="(item1,index1) in item " @click="gofilm(item1.id)">
						<img :src="item1.cover.origin" />
						<div class="now-item-mid">
							<h2>{{item1.name}}</h2>
							<p>{{item1.intro}}</p>
							<p>上映日期: {{item1.premiereAt | smalltime}}</p>
						</div>
					</li>
				</ul>
			</div>
		</mt-loadmore>
		</div>
	</div>
</template>

<script>
	import router from "../../router"
	import Bannercom from "../../common/banner.vue"
	import Filtrate from "../../common/filtrate.js"
	import Api from "../../common/api.js"
	import { Loadmore } from "mint-ui"
	import Vue from "vue"
	Vue.component( Loadmore.name , Loadmore)
	
	Vue.filter("bigtime",function(val){
		let obj = {0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"}
		let data = 	new Date(val);
		let month = data.getMonth() + 1;
		month = month>10 ? month : "0"+month;
		let day = data.getDate();
		day = day>10 ? day : "0"+day;
		let weekday = data.getDay();
		weekday = obj[weekday];
		return month + "月" + day + "日" + " 周" +weekday;
	})
	
	Vue.filter("smalltime",function(val){
		let data = 	new Date(val);
		let year = data.getFullYear();
		let month = data.getMonth()+1;
		month = month>10 ? month : "0"+month;
		let day = data.getDate();
		day = day>10 ? day : "0"+day;
		let weekday = data.getDay();
		return   year + "-" + month + "-" + day 
	})
	
	
	export default{
		data(){
			return{
				reallistdata : [],
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
				},2000)
			},
			loadBottom(){
				setTimeout(()=>{
					this.page += 1;
					this.$http.get(`${Api.commonsoonApi}&page=${this.page}&count=${this.count}`)		
					.then((response)=>{
						this.reallistdata =this.reallistdata.concat(response.data.data.films);
						this.listdata = Filtrate.filtrate(this.reallistdata )
					}).catch(function(error){
						console.log(error)
					})
					this.$refs.loadmore.onBottomLoaded();
					if(this.page >=7 ){
						this.canloadMore = false;
						return;
					}
				},1000)
			},
			gofilm(id){
				router.push('/movie/film/'+id);
			}
		},
		created(){
			this.$http.get(`${Api.commonsoonApi}&page=${this.page}&count=${this.count}`)		
			.then((response)=>{
				let alldata = response.data.data.films;
				this.reallistdata = alldata;
				this.listdata = Filtrate.filtrate(alldata)
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
	#commonsoon{
		width:100%;
		overflow:auto;
		position:absolute;
		left:0;
		top:0;
		bottom:0;
	}
	#commonsoon .soon-alllist .soon-alllist-title {
		padding-left:0.3rem;
		line-height: 1rem;
	}
	#commonsoon .now-lists{
		width:100%;
	}
	#commonsoon .now-lists li{
		margin:0.44rem 0.63rem 0.44rem 0.64rem;
		overflow: hidden;
		padding-bottom: 0.44rem;
		border-bottom: 1px solid #eee;
	}
	#commonsoon .now-lists li img{
		display:block;
		width:1.85rem;
		height:2.54rem;
		float:left;
	}
	#commonsoon .now-lists li .now-item-mid{
		float:left;
		width:6.41rem;
		margin-left: 0.56rem;
	}
	#commonsoon .now-lists li .now-item-mid h2{
		font-size:0.49rem;
		color:#000;
	}
	#commonsoon .now-lists li .now-item-mid p:nth-child(2){
		font-size:0.35rem;
		color:#787878;
		margin-top:0.44rem;
		margin-bottom: 0.58rem;
	}
	#commonsoon .now-lists li .now-item-mid p:nth-child(3){
		font-size:0.35rem;
		color:#FF5000;
	}
</style>

