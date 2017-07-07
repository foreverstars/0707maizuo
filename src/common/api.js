//选取城市
const locationApi = "api/city?__t=1498821378917";
//首页轮播接口
const bannerApi = "api/billboard/home?__t=1498815578781";

//正在热映的电影
const nowplayingApi = "/api/film/now-playing?__t=1498815578798";

//即将上映的电影
const commonsoonApi = "api/film/coming-soon?__t=1498815578821";

//电影详情
const moviedetailApi = "api/film";

//全部影院
const cinemaApi = "api/cinema";

//商城list
const listApi = "api/ad/list";

//商城home数据
const homeApi = "api/recommend/home?page=1&num=20";

//演出数据
const showApi = "api/schedule";

export default {
	locationApi,
	bannerApi,
	nowplayingApi,
	commonsoonApi,
	cinemaApi,
	listApi,
	homeApi,
	showApi,
	moviedetailApi
}

