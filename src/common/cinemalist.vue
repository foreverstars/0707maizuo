<template>
	<ul class="cinema-lists">
			<li class="cinema-item" v-for="(item,index) in data">
				<h3>{{item.name}}</h3>
				<p>{{item.address}}</p>
			</li>
		</ul>
</template>

<script>
	export default {
		data(){
			return{
			}
		},
		props:{ "data" : Array}
	}
</script>

<style>
	.cinema-lists{
		overflow: auto;
		position:absolute;
		bottom:0;
		top:5rem;
	}
	.cinema-item {
		padding:0.5rem;
		border-bottom: 1px solid #eee;
	}
	.cinema-item h3{
		font-size:0.5rem;
		line-height: 1rem;
	}
	 .cinema-item p{
		font-size:0.05rem!important;
		color:#ccc!important;
	}
</style>