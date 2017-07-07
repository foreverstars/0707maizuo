function filtrate(data){
	let sumarr = [];
	let arr = [];
	if(data.length == 1){
		console.log("end")
		arr.push(data[0])
		sumarr.push(arr)
		return sumarr;
	}
	let titletime = data[0].premiereAt;
	for(var i =0;i<data.length;i++){
		if(data[i].premiereAt == titletime){
			arr.push(data[i])
			if(i == data.length-1){
				sumarr.push(arr)
				return sumarr
			}
		}
		else{
			sumarr.push(arr)
			let data1 = data.slice(i)
			return sumarr.concat(filtrate(data1))
			break
		}
	}
}
export default {
	filtrate
}
