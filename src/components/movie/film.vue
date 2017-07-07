<template>
	<div>
		<div id="film">
			<div class="film-head">
				<span @click="goback" class="film-head-back">&lt;</span>
				<div class="film-head-logo1">
					<i class="iconfont">&#xe61e;</i>
					<span>预告片</span>
				</div>
				<div class="film-head-logo2">
					<i class="iconfont">&#xe674;</i>
					<span>剧照</span>
				</div>
			</div>
			
			<div class="film-head1" v-if="isShow">
				<span @click="goback" class="film-head-back">&lt;</span>
				<span v-text="name"></span>
				<i class="iconfont">&#xe61e;</i>
				<i class="iconfont">&#xe674;</i>
			</div>
			
			<div class="film-content">
			
				<div class="film-content-img">
					<div class="topp"></div>
					<img :src="filmdata.cover.origin" /><br /><div class="topp"></div>
					<div class="bott"></div>
				</div>
				
				<div class="film-content-con">
					<div class="film-content-top"></div>
					<h2 v-if="h1Show">{{filmdata.name}}</h2>
					<ul class="small-pro">
						<li>{{filmdata.category | category}}</li>
						<li>{{filmdata.mins | playingtime}}</li>
						<li>{{filmdata.nation}}</li>
						<span>{{filmdata.grade}}</span>
					</ul>
					
					<div class="bottomdiv">
						<p class="text-overflow" @click="showcom">{{filmdata.synopsis}}</p>
						<div class="showcomment" v-if="showcomment" @click="showcom">
							<p>{{filmdata.synopsis}}</p>
						</div>
						
						<p class="main-actors">主 演 :
							<span v-for	="item in filmdata.actors">{{item.name}}</span>
						</p>
						<p class="film-discuss">影评</p>
						
						<div class="small-banner">
							<mt-swipe :auto="0" :showIndicators="false">
							  <mt-swipe-item v-for="(item,index) in filmdata.photos" key="index">
							  	  <img :src="item.bigPictureAddress" />
							  </mt-swipe-item>
							</mt-swipe>
						</div>
						
						<p class="film-discuss">评论</p>
						<ul class="comments">
							<li v-for="item in commentsdata">
								<img :src="item.img" />
								<div class="comment-right">
									<h4>{{item.name}}</h4>
									<p class="comment-right-message">{{item.message}}</p>
									<div style="width:7rem;font-size:0.4rem;border-bottom:1px dashed #eee;overflow:hidden;">
										<span style="float:left">几天前</span>
										<p style="float: left;margin-left: 3.2rem;">
											<span style="margin-right: 0.1rem;">{{item.bycomment}}</span><i style="margin-right: 0.3rem;" class="iconfont">&#xe60f;</i>
											<span style="margin-right: 0.1rem;">{{item.bysupport}}</span><i class="iconfont" :class="{'activee':change}" @click="changecolor" style="display:inline-block;">&#xe602;</i>
										</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
				<div class="film-foot">
					<i class="iconfont">&#xe60f;</i>
					<i class="iconfont" :class="{'activee':change}" @click="changecolor" style="display:inline-block;">&#xe611;</i>
					<i class="iconfont" >&#xe612;</i>
					<span @click="gobuy">立即购票</span>
				</div>
		</div>
		<router-view :namedata="data"></router-view>
	</div>
</template>

<script>
	
import router from '../../router'
import Api from "../../common/api.js"
import Vue from "vue"
import { Swipe , SwipeItem } from "mint-ui"
import middle from "../../common/middle.js"
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name,  SwipeItem)

Vue.filter("category",function(value){
	if(value){
		let str = value.replace("|",",");
		return str
	}
	return
})

Vue.filter("playingtime",function(value){
	if(value){
		let hour = parseInt(value/60);
		let min = value%60;
		return hour+"小时"+min+"分"
	}
	return 
})


export default {
	data(){
		return {
			filmdata : {
				cover : ""
			},
			isShow :false,
			name : "",
			h1Show :true,
			commentsdata:[],
			data　:"",
			showcomment :false,
			change : false
		}
	},
	methods: {
		goback(){
			router.go(-1);
		},
		gobuy(){
			router.push("/movie/film/"+ this.$route.params.id+"/gocinema")
		},
		showcom(){
			this.showcomment = !this.showcomment 
		},
		changecolor(){
			this.change = !this.change;		
		}
	},
	created(){
		let id = this.$route.params.id;
		let data = new Date();
		let time = data.getTime();
		this.$http.get(`${Api.moviedetailApi}/${id}?__t=${time}`)
		.then((response)=>{
			setTimeout(()=>{
				let wait = document.querySelector(".waitfor");
				document.querySelector(".all").removeChild(wait);
			},1000)
			this.filmdata = response.data.data.film;
			this.data = this.filmdata.name; 
		}).catch(function(error){
			console.log(error)
		})	
		
		this.$http.get("/static/comments.json")
		.then((response)=>{
			this.commentsdata = response.data;
		}).catch(function(error){
			console.log(error)
		})		
	},
	mounted(){
	
		let scrollDiv = document.querySelector(".film-content-con");
		let hDiv = scrollDiv.querySelector("h2");
		let imgDiv = document.querySelector(".film-content-img");
		let head1 = document.querySelector(".film-head");
		let head2 = document.querySelector(".film-head1");
		let that = this;
		scrollDiv.addEventListener("scroll",function(){
			
			let top = this.scrollTop;
			if(top>=150){
				if(top>=168){
					hDiv.style.left = 0;
					that.h1Show = false;
					that.isShow =true;
					that.name = that.filmdata.name;
				}
				hDiv.style.left= (top-110)/2+"px";
			}
			else{
				that.h1Show = true;
				that.isShow = false;
				that.name = "";
				imgDiv.style.top = top*(-1)/3+ "px";
			}
		})
	},
}
	

</script>

<style>
	#film{
		width:100%;
		height:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:0;
		background:#fff;
		z-index:1;
	}
	#film .film-head1{
		width:100%;
		position:fixed;
		padding:0 0.5rem;
		height:1.5rem;
		font-size:0.6rem;
		z-index:20;
		background:#fff;
		border-bottom: 1px solid #eee;
	}
	#film .film-head1 span:nth-child(1){
		color:#20b4d2;
		float:left;
		line-height: 1.5rem;
		font-size:1rem;
	}
	#film .film-head1 span:nth-child(2){
		color:#595959;
		float:left;
		line-height: 1.5rem;
		font-size:0.55rem;
	
	}
	#film .film-head1 i:nth-child(3){
		color:#20b4d2;
		line-height: 1.5rem;
		font-size:1rem;
		position:absolute;
		right:2.2rem;
		top:0;
	}
	#film .film-head1 i:nth-child(4){
		color:#20b4d2;
		float:right;
		line-height: 1.5rem;
		font-size:0.6rem;
		margin-top: 0.05rem;
	}
	
	#film .film-head{
		position:fixed;
		padding:0 0.5rem;
		height:1.5rem;
		font-size:0.6rem;
		z-index:20
	}
	#film .film-head .film-head-back{
		float:left;
		color:#fff;
		line-height: 1.5rem;
		font-size:1rem;
	}
	#film .film-head .film-head-logo1 i{
		color:#fff;
		line-height: 1.5rem;
		font-size:1rem;
		margin-right: 0.1rem;
		float:left;
	}
	#film .film-head .film-head-logo1{
		margin-left: 3rem;
		float:left;
		margin-right:0.5rem;
	}
	#film .film-head .film-head-logo1 span{
		float:left;
		color:#fff;
		line-height: 1.5rem;
		font-size:0.5rem;
		
	}
	#film .film-head .film-head-logo2 {
		float:right;
		color:#fff;
		line-height: 1.5rem;
		font-size:1rem;
	}
	#film .film-head .film-head-logo2 i{
		float:left;
		color:#fff;
		line-height: 1.5rem;
		font-size:0.6rem;
		margin-right: 0.5rem;
		margin-top: 0.05rem;
	}
	#film .film-head .film-head-logo2 span{
		float:left;
		color:#fff;
		line-height: 1.5rem;
		font-size:0.5rem;
	}
	#film .film-content{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:1.4rem;
		z-index: 10;
	}
	#film .film-content .topp{
		width:100%;
		height:2.5rem;
		position:absolute;
		left:0;
		top:0;
		background:darkgray;
		z-index:1;
		opacity:0.6;
	}
	#film .film-content .bott{
		width:100%;
		height:4rem;
		position:absolute;
		left:0;
		bottom:0;
		background:darkgray;
		z-index:1;
		opacity:0.6;
	}
	#film .film-content  .film-content-img{
		width:100%;
		height:9.65rem;
		position:absolute;
		overflow: hidden;
		left:0;
		top:0;
	}
	#film .film-content .film-content-img img{
		display:block;
		width:100%;
		height:9.65rem;
		transform: scaleX(2) scaleY(1.5);
		position:absolute;
		left:0;
		top:2rem;
	}

	#film .film-content .film-content-con{
		width:100%;
		position:absolute;
		left:0;
		top:0rem;
		bottom:0;
		overflow: auto;
		z-index:1;
	}
	.film-content-con h2{
		color:#fff;
		font-size:0.6rem;
		margin-left: 0.1rem;
		position:absolute;
		left:0;
		top:180px;
	}
	.film-content-con .small-pro{
		height:1rem;
		margin-top: 0.6rem;
	}
	.film-content-con .small-pro li{
		float:left;
		font-size:0.4rem;
		color:#e57300;
		margin:0 0.2rem;
	}
	.film-content-con .small-pro span{
		float:right;
		color:#e57300;
		margin-top: -0.3rem;
	}
	.film-content-con .text-overflow{
		width:95%;
		margin:0.7rem auto;
		font-size:0.37rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		border:1px solid #ccc;
		padding:0.2rem;
		height:2rem;
		border-radius:5px;
	}
	.film-content-con .main-actors{
		font-size:0.5rem;
		padding-left: 0.2rem;		
	}
	.film-content-con .main-actors span{
		margin: 0 0.2rem;
	}
	.small-banner{
		width:90%;
		height:4rem;
		margin:0.4rem auto;
	}
	.film-discuss{
		font-size:0.6rem;
		position:relative;
		margin-top:0.4rem;
		padding-left: 0.6rem;
	}
	.film-discuss:before{
		content:"";
		display:block;
		width:5px;
		height:100%;
		background:#ff501c;
		position:absolute;
		left:5px;
		top:0;
		border-radius:5px;
	}
	#film .film-foot{
		width:100%;
		height:1.4rem;
		position:absolute;
		left:0;
		bottom:0;
		background:#fff;
		z-index:1;
	}
	#film .film-foot i{
		font-size:0.8rem;
		line-height: 1.4rem;
		margin:0 0.2rem;
	}
	#film .film-foot i.activee{
		color:#ff0099;
		animation: changee 0.5s linear;
	}
	#film .film-foot span{
		width:3rem;
		height:1.4rem;
		position:absolute;
		right:0;
		top:0;
		text-align: center;
		line-height: 1.4rem;
		color:#fff;
		font-size:0.6rem;
		background:#ff3300;
	}
	.discuss{
		width:100%;
		height:800px;
	}
	.film-content-top{
		width:100%;
		height:200px;
	}
	.bottomdiv{
		width:100%;
		background:#fff;
		overflow: hidden;
	}
	.ani-time{
		animation-duration: 1s;
	}
	@keyframes slide1{
		from{transform: translateX(100%)}
		to{transform: translateX(0%)}
	}
	@keyframes slide2{
		from{transform: translateX(0%)}
		to{transform: translateX(100%)}
	}
	.slide-enter-active{
		animation: slide1 1s;
	}
	.slide-leave-active{
		animation: slide2 1s;
	}
	.comments li{
		padding:0.4rem;
		overflow:hidden;
	}
	.comments li img{
		display:block;
		width:2rem;
		float:left;
	}
	.comments li .comment-right{
		margin-left: 0.4rem;
		float:left;
		font-size:0.6rem;
		line-height: 1rem;
	}
	.comments li .comment-right i{
		font-size:0.5rem;
		color:#000;
	}
	.comments li .comment-right i.activee{
		color:#ff0099;
		animation: changee 0.5s linear;
	}
	@keyframes changee{
		from{color:#000;transform: scale(1,1);}
		to{color:#ff0099;transform: scale(1.3,1.3);}
	}
	.showcomment{
		position:fixed;
		top:0;
		bottom:0;
		width:100%;
		z-index: 1000;
		background:#fff;
		display:flex;
		justify-content: center;
	}
	.showcomment p{
		align-self: center;
		font-size:0.6rem;
		padding:0 0.2rem;
		animation: big 1s linear;
	}
	@keyframes big{
		from{transform: scale(0.1,0.1);}
		to{transform: scale(1,1);}
	}
	
</style>

