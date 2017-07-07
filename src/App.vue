<template>
  <div id="app">
  		<router-view></router-view>
   		<nav class="tabs">
   				<router-link v-for="(item,index) in listdata" @click.native="changestyle(index)" :to="item.path" key="index">
   						<em :class="item.ico" ></em>
   						<span v-if="item.spanshow">{{item.title}}</span>
   				</router-link>
   		</nav>
  </div>
</template>

<script>
export default {
  data(){
  	return{
  		listdata:[
 					{title : "电影", path : "/movie", ico : "icon-dianying iconfont",spanshow:false},
 					{title : "影院", path : "/cinema", ico : "icon-dianyingpiao iconfont",spanshow:true}, 	
 					{title : "演出", path : "/show", ico : "icon-iconlive iconfont",spanshow:true}, 	
 					{title : "商城", path : "/store", ico : "icon-shangcheng iconfont",spanshow:true}, 	
 					{title : "我的", path : "/mine", ico : "icon-wode iconfont",spanshow:true} 	
   		]
  	}
  },
  methods:{
  	changestyle(activeindex){
  		this.listdata.map((item,index)=>{
					item.spanshow = true;
  		})
  		this.listdata[activeindex].spanshow = false;
  	}
   }
}
</script>

<style>
	html,body,#app{
		width:100%;
		height:100%;
	}
	.tabs{
		width:100%;
		height:1.77rem;
		position:absolute;
		left:0;
		bottom:0;
		display: flex;
	}
	.tabs:before{
		content:"";
		width:100%;
		height:1px;
		position:absolute;
		left:0;
		top:-1px;
		border:1px solid #ccc;
		transform: scaleY(0.5);		
	}
	.tabs a{
		display:flex;
		flex:1;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
	}
	.tabs a em{
		width:50%;
		height:50%;
		color:#555;
		font-size:0.72rem;
		text-align: center;
		line-height: 1.4rem;
	}
	.tabs a.router-link-active em:before{
		font-size:0.98rem;
		border-bottom: 2px solid #ff5000;
		color:#ff5000;
		line-height: 1.6rem;
	}
	.tabs a span {
		display:block;
		font-size:0.32rem;
		width:50%;
		height:50%;
		text-align: center;
		line-height: 0.88rem;	
		color:#555;	
	}
	
</style>
