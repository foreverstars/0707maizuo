<template>
	<transition name="slide">
		<div id="address">
			<div class="addhead">
				<span @click="goback">&lt;</span>
				<span>城市选择</span>
			</div>
			<div class="alladdress">
				<div class="alladdress-left">
					<div class="navigate">GPS定位您所在的城市</div>
					<div class="nav-items" style="color:#ff8561" @click="chooseaddress(geocity)" v-text="geocity"></div>
					<div class="navigate">热门城市</div>
					<div class="nav-items" v-for="item in hotcity" @click="chooseaddress(item)">{{item}}</div>
				
					
					<div v-for="item in listdata" class="item-left">
						<div class="navigate">{{item.title}}</div>
						<div v-for="items in item.data" class="nav-items" @click="chooseaddress(items.name)">
							{{items.name}}
						</div>
					</div>
				</div>
				<ul class="alladdress-right">
					<li v-for="(item,index) in listdata" @click="searching(index)">
						{{item.title}}
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script>
	import Api from "../../common/api"
	import {IndexList, IndexSection ,Cell} from "mint-ui"
	import Vue from "vue" 
	Vue.component(IndexList.name,IndexList)
	Vue.component(IndexSection.name , IndexSection)
	Vue.component(Cell.name , Cell)
	export default{
		data(){
			return{
				listdata:[],
				geocity: "深圳",
				hotcity: ["深圳","广州","上海","北京"]
			}
		},
		methods : {
			searching(index){
				let allDiv = document.querySelectorAll(".item-left");
				let leftDiv = document.querySelector(".alladdress-left"); 
				leftDiv.scrollTop =  allDiv[index].offsetTop;
			},
			goback(){
				this.$router.go(-1);
			},
			chooseaddress(data){
				this.$store.commit('city/upDate',data)
				this.$router.go(-1);
			}
		},
		created(){
			let arr = [];
			for(let i=65;i<=90;i++){
			let str = String.fromCharCode(i);
				let obj = {};
				obj.title = str;
				obj.data = [];
				arr.push(obj);
			}
			this.listdata = arr;
			this.$http.get(`${Api.locationApi}`)		
			.then((response)=>{
				let data = response.data.data.cities;
				this.listdata.map((item,index)=>{
					const first = item.title;
					data.map((item,index1)=>{
						if(item.pinyin.startsWith(first)){
							this.listdata[index].data.push(item)
						}
					})
				})
			}).catch(function(error){
				console.log(error)
			})		
		}
		
	}
</script>

<style>
	#address{
		width:100%;
		height:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:0;
		background:#fff;
		z-index:10;
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
	#address .addhead{
		height:1.5rem;
		padding-left:0.2rem;
	}
	#address .addhead span:nth-child(1){
		color:#2eb9d5;
		line-height: 1.5rem;
	}
	#address .addhead span:nth-child(2){
		font-size:0.7rem;
		color:#757575;
		line-height: 1.5rem;
	}
	.navigate{
		width:90%;
		padding-left:0.2rem;
		background:#eee;
		font-size:0.4rem;
		line-height: 1rem;
		height:1rem;
	}
	.nav-items{
		width:90%;
		margin-left:0.2rem;
		background:#fff;
		font-size:0.5rem;
		line-height: 1.5rem;
		height:1.5rem;
		border-bottom: 1px solid #ccc;
	}
	.alladdress{
		position:absolute;
		top:1.5rem;
		left:0;
		bottom:0;
		width:100%;
	}
	.alladdress-left{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		overflow:auto;
		bottom:0;
	}
	.alladdress-right{
		position:absolute;
		top:0;
		right:0;
		width:10%;
		background:	#20b4d2;
	}
	.alladdress-right li{
		color:#fff;
		font-size:0.4rem;
		line-height: 0.69rem;
		text-align: center;
	}

</style>