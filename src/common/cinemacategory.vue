<template>
	<div>
		<p class="cinema-logo">
			<span v-if="logoshow">全部区域、服务</span>
			<span v-if="!logoshow"><em @click="nodata">X</em> 已选: {{areadata}}</span>
			<i class="iconfont" @click="goshow">筛选&#xe618;</i>
		</p>
		
		<div class="cinema-category" v-if="categoryshow">
			<p>区域 <span style="margin-left:0.2rem" v-text="areadata"></span></p>
			<ul>
				<li v-for="(item,index) in category" :class="{'active': activeindex == index}" @click="lichange(index,item.name)">
					{{item.name}}
				</li>
			</ul>
			<p>服务</p>
			<ul>
				<li>可退费</li>
				<li>观影小食</li>
				<li>IMAX</li>
				<li>特惠影院</li>
				<li>价格最低</li>
			</ul>
			<a class="cinema-cancel" @click="cancel">取消</a><a class="cinema-confirm" @click="confirm">确定</a>
		</div>
		
		<div class="cinema-gray" v-if="grayshow"></div>
	</div>	
</template>

<script>
	import middle from "./middle.js"
	export default {
		data(){
			return{
				categoryshow : false,
				grayshow : false,
				activeindex : -1,
				areadata : "",
				logoshow : true,
				confirmindex:""
			}
		},
		props:{"category" : Array},
		methods:{
			goshow(){
				if(this.$route.name == "gocinema"){
					middle.$emit("searchshow1")
				}else{
					middle.$emit("searchshow2")
				}
				this.searchshow = !this.searchshow ;
				this.categoryshow = !this.categoryshow;
				this.grayshow = !this.grayshow;
			},
			lichange(index,val){
				if(index == this.activeindex ){
					this.activeindex = -1;
					this.areadata = "";
					this.confirmindex = "";
					return
				}
				this.activeindex = index;
				this.areadata = val;
				this.confirmindex = index;
			},
			cancel(){
				if(this.$route.name == "gocinema"){
					middle.$emit("searchshow1")
				}else{
					middle.$emit("searchshow2")
				}
				this.categoryshow = !this.categoryshow;
				this.grayshow = !this.grayshow;
			},
			confirm(){
				if(this.$route.name == "gocinema"){
					middle.$emit("changedata1",this.confirmindex)
					middle.$emit("searchshow1")
				}else{
					middle.$emit("changedata2",this.confirmindex)
					middle.$emit("searchshow2")
				}
				this.categoryshow = !this.categoryshow;
				this.grayshow = !this.grayshow;
				if(this.areadata != ""){
					this.logoshow = false;
				}
				else{
					this.logoshow = true;
				}
			},
			nodata(){
				this.areadata = "";
				this.logoshow = true;
				this.activeindex = -1;
			}
		}
	}
	
</script>

<style>
	.cinema-logo{
		overflow: hidden;
	}
	.cinema-logo span{
		float:left;
		font-size:0.45rem;
		color:#000;
		line-height: 1rem;
		margin-left: 0.2rem;
	}
	.cinema-logo i{
		font-size: 0.45rem;
		float:right;
		line-height:1rem;
		color:#20B4D2;
		margin-right: 0.2rem;
	}
	.cinema-banner{
		width:100%;
		height:3rem;
	}
	
	.cinema-category{
		width:100%;
		position:absolute;
		left:0;
		top:1rem;
		background:#fff;
		z-index:2;
	}
	.cinema-category p{
		margin-left: 0.2rem;
		font-size:0.4rem;
		line-height:1.4rem;
	}
	.cinema-category ul{
		overflow: hidden;
		border-bottom: 1px solid #eee;		
	}
	.cinema-category ul li{
		float:left;
		font-size:0.4rem;
		margin:0.2rem;
		border:1px solid #ccc;
		padding:0.1rem 0.3rem;
		border-radius:5px;
	}
	.cinema-category ul li.active{
		background:#E57300;
		color:white;
	}
	.cinema-cancel{
		display:inline-block;
		width:50%;
		line-height: 1.5rem;
		text-align: center;
		font-size:0.4rem;
	}
	.cinema-confirm{
		display:inline-block;
		width:50%;
		line-height: 1.5rem;
		text-align: center;
		font-size:0.4rem;
		color:#22B5D2;
	}
	.cinema-gray{
		width:100%;
		position:absolute;
		background:gray;
		top:1rem;
		left:0;
		bottom:0;
		z-index:1;
		opacity: 0.6;
	}
</style>