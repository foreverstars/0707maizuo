<template>
	<div class="all">
		<div id="movie">
			
			<div class="header">
				<img src="../../../static/image/robot.png" />
				<p>卖座电影</p>
				<div class="geoshow">
					<router-link to="/movie/address">
						<span>{{$store.state.city.name}}</span>
						<i class="iconfont">&#xe619;</i>
					</router-link>
				</div>
			</div>
			
			<ul class="movielist">
				<li ref="changeli" v-for="(item,index) in listdata" :class="{'active' : item.flag}" @click="changestyle(index)">
					<p class="move-title">{{item.title}}</p>
				</li>
				<span ref="moveline" class="moveline"></span>
			</ul>
			
			<div id="mylistcom">
				
				<swiper :options="swiperOption" ref="mySwiper" >
					<swiper-slide>
				        <Nowplayingcom></Nowplayingcom>
				    </swiper-slide>
				    <swiper-slide>
				        <Commonsooncom></Commonsooncom >	
				    </swiper-slide>
				    <swiper-slide>
				        <Hotactivitescom></Hotactivitescom>
				    </swiper-slide>
				
				</swiper>
			</div>

		</div>		
		
		<router-view></router-view>

	</div>
</template>
<script>
	import Api from "../../common/api.js"
	import Nowplayingcom from "./nowplaying.vue"
	import Commonsooncom from "./commonsoon.vue"
	import Hotactivitescom from "./hotactivites.vue"
	import Vue from "vue"
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	Vue.use(VueAwesomeSwiper)
	let timeOut;
	export default {
		data(){
			return{
				listdata : [
					{title : "热映电影", flag: true},
					{title : "即将上映", flag: false}, 
					{title : "热门活动", flag: false}, 
				],
				swiperOption: {
					notNextTick: true,
			        autoplay: false,
			        onSlideChangeStart: swiper => {
			            let index =  swiper.realIndex;
            			this.styleChange(index)
                  	}
        		}
			}
		},
		computed: {
      		swiper() {
        		return this.$refs.mySwiper.swiper
      		}
    	},
		methods : {
			changestyle(index){
				this.swiper.slideTo(index, 500, false)
				this.styleChange(index)
			},
			styleChange(index){
				this.$refs.changeli.map((item,index1)=>{
					if(index1 == index ){
						this.listdata[index1].flag = true;
					}
					else{
						this.listdata[index1].flag = false;
					}
				})
				
				let allP = document.querySelectorAll(".move-title");
				let endleft = parseInt(allP[index].offsetLeft);
				let timer = null;
				timer = setInterval(()=>{
					let nowleft = this.$refs.moveline.offsetLeft;
					let speed = (endleft-nowleft)/6;
  					speed = speed>0?Math.ceil(speed):Math.floor(speed);
					if(endleft == nowleft){
						this.$refs.moveline.style.left = endleft + "px";
						clearInterval(timer)
						return
					}
					this.$refs.moveline.style.left = nowleft + speed +　"px";
				},10)
			}
		},
		created(){
			setTimeout(()=>{
				let allP = document.querySelectorAll(".move-title");
				this.$refs.moveline.style.left = allP[0].offsetLeft +　"px";
			},10)
		},
		components: {
			Nowplayingcom,
			Commonsooncom,
			Hotactivitescom
		},
		mounted(){
			let smallSwipe = document.querySelectorAll(".mint-swipe");
			let bigSwipe = this.swiper;
			for(let i=0;i< smallSwipe.length;i++){
				smallSwipe[i].addEventListener("touchstart",function(){
					bigSwipe.lockSwipes();
				})
				smallSwipe[i].addEventListener("touchend",function(){
					bigSwipe.unlockSwipes();
				})
			}
			
			
		}
	}
</script>

<style>
	#movie{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:1.77rem;
	}
	#movie .header{
		height:1.5rem;
		padding:0.24rem 0.31rem 0 0.55rem;
	}
	#movie .header img{
		display:block;
		width:1.17rem;
		height:1.26rem;
		float:left;
	}
	#movie .header p{
		float:left;
		width:1.94rem;
		height:0.77rem;
		font-size:0.31rem;
		background:#ff6946;
		color:#fff;
		text-align: center;
		line-height: 0.7rem;
	}
	#movie .header .geoshow{
		float:right;
		font-size:0.4rem;
	
		line-height:1.2rem;
	}
	#movie .header .geoshow i{
		font-size:0.5rem;
		color:#22b5d2;
	
	}
	a{text-decoration: none}
	.movielist{
		width:100%;
		height:1.2rem;
		margin-top: 0.1rem;
		position: relative;
	}
	.movielist li{
		float:left;
		width:32%;
	}
	.movielist li p {
		line-height:1.2rem;
		text-align: center;
		font-size:0.35rem;
		color:#757575;
		width:2rem;
		margin : 0 auto;
		height:1.2rem;
	}
	.movielist li.active p{
		color:#ff6640;
	}
	.movielist .moveline{
		display:block;
		width:1.9rem;
		height:0.06rem;
		background:#ff6640;
		position:absolute;
		bottom:0;
	}
	#mylistcom{
		width:100%;
		position:absolute;
		left:0;
		top:2.9rem;
		bottom:0;
	}
	.swiper-container{
		height:100%;
	}
	.waitfor{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:0;
		background:#F7F7F7;
		z-index:20;
		display:flex;
		justify-content: center;
	}
	.spinner {
	  align-self: center;	  
	  width: 90px;
	  height: 90px;
	  position: relative;
	  text-align: center;
     -webkit-animation: rotate 2.0s infinite linear;
  	 animation: rotate 2.0s infinite linear;
	}
 	.dot1, .dot2 {
	  width: 60%;
	  height: 60%;
	  display: inline-block;
	  position: absolute;
	  top: 0;
	  background-color: #67CF22;
	  border-radius: 100%;
     -webkit-animation: bounce 2.0s infinite ease-in-out;
  	 animation: bounce 2.0s infinite ease-in-out;
	}
 	.dot2 {
	  top: auto;
	  bottom: 0px;
	  -webkit-animation-delay: -1.0s;
	  animation-delay: -1.0s;
	}
 	@-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg) }}
	@keyframes rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
 	@-webkit-keyframes bounce {
  		0%, 100% { -webkit-transform: scale(0.0) }
  		50% { -webkit-transform: scale(1.0) }
	}
 	@keyframes bounce {
	  0%, 100% {
	    transform: scale(0.0);
	    -webkit-transform: scale(0.0);
	  } 50% {
	    transform: scale(1.0);
	    -webkit-transform: scale(1.0);
	  }
	}
</style>