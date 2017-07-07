<template>
	<div id="gocinema">
		<div class="gocinema-header">
			<em @click="goback">&lt;</em>
			<span>{{namedata}}</span>
			<i class="iconfont" v-show="searchshow">&#xe624;</i>
		</div>
		<category :category="categorydata"></category>
		<list :data="data"></list>
	</div>
</template>

<script>
	import category from "../../common/cinemacategory.vue"
	import list from "../../common/cinemalist.vue"
	import Api from "../../common/api.js"
	import middle from "../../common/middle.js"
	import router from "../../router"
	export default{
		data(){
			return{
				searchshow : true,
				categorydata:[],
				data:[],
				name :""
			}
		},
		props:["namedata"],
		methods:{
			goback(){
				router.go(-1)
			}
		},
		created(){
			
		
			let id = this.$route.params.id;
			this.$http.get(`api/film/${id}/cinema?__t=${new Date().getTime()}`)
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
			middle.$on("changedata1",(index)=>{
				console.log("自定义1")
				if(index !="" ){
					this.data = this.categorydata[index].data;
				}
			})
			middle.$on("searchshow1",()=>{
				this.searchshow = !this.searchshow;
			})
		},
		components:{
			category,
			list
		}
	}
</script>

<style>
	#gocinema{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:0;
		background:#fff;
		z-index:2;
	}
	#gocinema .gocinema-header{
		padding:0 0.4rem;
		overflow:hidden;
		height:1rem;
		border-bottom: 1px solid #eee;
		z-index:2;
	}
	#gocinema .gocinema-header em{
		float:left;
		font-size:0.6rem;
		line-height: 1rem;
		color:#20B4D2;
	}
	#gocinema .gocinema-header span{
		float:left;
		font-size:0.6rem;
		line-height:1rem ;
		margin-left: 0.5rem;
	}
	#gocinema .gocinema-header i{
		float:right;
		font-size:0.6rem;
		line-height: 1rem;
		color:#20B4D2;
	}
	#gocinema .cinema-lists{
		top:2rem;
	}
</style>