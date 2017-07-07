<template>
	<div id="hotactivites">
		<div>
		<mt-loadmore :top-method="loadTop"  
			:autoFill="false" :bottomAllLoaded="canloadMore" ref="loadmore">
		
			<Bannercom></Bannercom>
			<ul class="hot-logolist">
				<li v-for="(item,index) in listdata">
					<h2>{{item.title1}}</h2>
					<p>{{item.title2}}</p>
				</li>
			</ul>
			
			<ul class="hot-lists">
				<li>
					<img src="static/image/active1.png"/>
					<div class="now-item-mid">
						<h2>蛙蛙在线</h2>
						<p>免费领16张电影票</p>
						<p>活动时间:2017-05-24至12-31</p>
					</div>
				</li>
				<li>
					<img src="static/image/active2.png"/>
					<div class="now-item-mid">
						<h2>浙商银行</h2>
						<p>一元看电影</p>
						<p>活动时间:2017-05-24至12-31</p>
					</div>
				</li>
			</ul>
		</mt-loadmore>
		</div>
	</div>
</template>

<script>
	import Bannercom from "../../common/banner.vue"
	import { Loadmore } from "mint-ui"
	import Vue from "vue"
	Vue.component( Loadmore.name , Loadmore)
	export default {
		data(){
			return {
				listdata : [
					{title1 : "卖座演出", title2 : "折扣特惠享不停"},
					{title1 : "周边·好货", title2 : "全程包邮￥9.9起"},
					{title1 : "电影实验室", title2 : "让你大开眼界"},
					{title1 : "福利大放送", title2 : "免费电影票天天领"}
				],
				canloadMore : true
			}
		},
		methods:{
			loadTop(){
				setTimeout(()=>{
					this.$refs.loadmore.onTopLoaded()
				},1000)
			}
		},
		components:{
			Bannercom
		}
	}
</script>

<style>
	#hotactivites{
		width:100%;
		position:absolute;
		overflow:auto;
		left:0;
		top:0;
		bottom:0;
	}
	#hotactivites .hot-logolist{
		width:100%;
		margin-top: 0.2rem;
		overflow: hidden;
	}
	#hotactivites .hot-logolist li{
		width:50%;
		float:left;
		margin-bottom: 0.3rem;
	}
	#hotactivites .hot-logolist li h2{
		font-size:0.5rem;
		text-align: center;
		line-height:0.8rem;
	}
	#hotactivites .hot-logolist li p{
		font-size:0.4rem;
		color:#ccc;
		text-align: center;
		line-height: 0.6rem;
	}
	#hotactivites .hot-lists{
		width:100%;
	}
	#hotactivites .hot-lists li{
		margin:0.44rem 0.63rem 0.44rem 0.64rem;
		overflow: hidden;
		padding-bottom: 0.44rem;
		border-bottom: 1px solid #eee;
	}
	#hotactivites .hot-lists li img{
		display:block;
		width:1.85rem;
		height:2.54rem;
		float:left;
	}
	#hotactivites .hot-lists li .now-item-mid{
		float:left;
		width:6.41rem;
		margin-left: 0.56rem;
	}
	#hotactivites .hot-lists li .now-item-mid h2{
		font-size:0.56rem;
		color:#000;
	}
	#hotactivites .hot-lists li .now-item-mid p:nth-child(2){
		font-size:0.35rem;
		color:#787878;
		margin-top:0.32rem;
		margin-bottom: 0.48rem;
	}
	#hotactivites .hot-lists li .now-item-mid p:nth-child(3){
		font-size:0.35rem;
		color:#ff8764;
	}
</style>