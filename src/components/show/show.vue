<template>
	<div>
		<div id="show">
			<div class="show-head">
				演出票务
			</div>
			<ul class="show-lists">
				<li v-for="item in listdata" @click="test($event)">
					<img :src="item.skuList[0].image"/>
					<p>{{item.masterName}}</p>
				</li>
			
			</ul>
		</div>
	</div>
</template>

<script>
	import Api from "../../common/api.js"
	export default{
		data(){
			return{
				listdata :[]
			}
		},
		methods:{
			test(e){
				console.log(e.currentTarget)
			}
		},
		created(){
			this.$http.get(`schedule?__t=${(new Date()).getTime()}&pageSize=6&pageNumber=1&sortKey=sortSalesCount&sortType=desc&isMultiSku=1`)
			.then((response)=>{
				this.listdata = response.data.data.list;
			}).catch((error)=>{
				console.log(error)
			})
     	},
    	mounted(){
    		console.log(this.$route)
    	}
	}
</script>
	
<style>
	@keyframes waiting1{
		from{transform: translateX(100%)}
		to{transform: translateX(0%)}
	}
	@keyframes waiting2{
		from{transform: translateX(0%)}
		to{transform: translateX(100%)}
	}
	.waiting-enter-active{
		animation: slide1 1s;
	}
	.waiting-leave-active{
		animation: slide2 1s;
	}
	#show{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:1.77rem;
	}
	#show .show-head{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		font-size:0.6rem;
		padding-left: 0.2rem;
		line-height: 1rem;
		border-bottom: 1px solid #ccc;
	}
	#show .show-lists{
		position:absolute;
		left:0;
		top:1rem;
		bottom:0;
		overflow:auto
	}
	#show .show-lists li{
		padding:0.3rem 0.3rem 1rem 0.3rem;
	}
	#show .show-lists li p{
		font-size:0.4rem;
		line-height: 1rem;
	}
	#show .nomore{
		font-size:0.4rem;
		margin:0.3rem auto;
		color:gray;
		width:2.5rem;
	}
	.show-wait{
		width:100%;
		position:absolute;
		top:1rem;
		left:0;
		bottom:0;
		background:#fff;
		z-index:10;
	}
	.show-wait-line1{
		position:absolute;
		left:0;
		top:0;
		width:1.5rem;
		height:0.2rem;
		background:blue;
		animation: moveright 1s infinite;
	}
	.show-wait-line2{
		position:absolute;
		left:1.6rem;
		top:1.5;
		width:2rem;
		height:0.2rem;
		background:blue;
		animation: moveright 1s infinite;
	}
	
</style>