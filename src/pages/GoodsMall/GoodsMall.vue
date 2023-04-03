<template>
  <div id="GoodsMall">
    <Nav activePage="GoodsMall" />
    <Banner page="GoodsMall" title="交易大厅" discribtion="在这里寻找需要的商品"/>

    <!--搜索商品-->
    <div class="search">
          <input type="text" placeholder="搜索商品" v-model="kwd" />
          <button class="iconfont icon-sousuo" @click="search_by_kwd()">搜索</button>
        </div>

     <!--商品分类-->
    <ul class="classify">
    <li :class="{ active: isall }" @click="getGoodsSpecificList('全部')">全部</li>
      <li :class="{ active: ishousehold_goods }" @click="getGoodsSpecificList('生活用品')">生活用品</li>
      <li :class="{ active: isdiet }" @click="getGoodsSpecificList('饮食')">饮食</li>
      <li :class="{ active: isdress }" @click="getGoodsSpecificList('服饰')">服饰</li>
      <li :class="{ active: isdigital }" @click="getGoodsSpecificList('数码')">数码</li>
      <li :class="{ active: ishome_appliances }" @click="getGoodsSpecificList('家电')">家电</li>
      <li :class="{ active: ismab }" @click="getGoodsSpecificList('母婴')">母婴</li>
    </ul>

    <ul class="content">
      <li v-for="goods in goodsList" :key="goods.goods_id">
        <AGoods :goods="goods"/>
      </li>
    </ul>
    <Footer />
  </div>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import AGoods from "../../components/AGoods.vue";

export default {
  name: "GoodsMall",
  data(){
    return{
      goodsList:[],
      goodsListrev:[],
      kwd:'',
      cancel:false,//取消按钮显示与否标志
      isall:true,//全部
      ishousehold_goods:false,//生活用品
      isdiet:false,//饮食
      isdress:false,//服饰
      isdigital:false,//数码
      ishome_appliances:false,//家电
      ismab:false//母婴
    }
  },
  components: {
    Nav,
    Banner,
    Footer,
    AGoods
  },
  mounted(){
      this.getGoodsList()
  },
  methods:{
      // 获取商品列表
    getGoodsList(){
      this.$axios.get("/api/getGoodsList").then((res)=>{
        this.goodsList=res.data
         this.goodsList=this.goodsList.filter((item)=>{
          return item.buyer==null
        })
      })
    },
    // 获取不同类型的商品
    getGoodsSpecificList(key){
      this.$axios.get("/api/getGoodsList").then((res)=>{
        res.data.forEach(item=>{
          item.img=item.img.split(',')
        })
        this.goodsList=res.data
        if(key=="全部"){
          this.isall=true
          this.ishousehold_goods=false
          this.isdiet=false
          this.isdress=false
          this.isdigital=false
          this.ishome_appliances=false
          this.ismab=false
          this.goodsList=this.goodsList.filter((item)=>{
            return item.buyer==null
          })
        }else if(key=="生活用品"){
          this.isall=false
          this.ishousehold_goods=true
          this.isdiet=false
          this.isdress=false
          this.isdigital=false
          this.ishome_appliances=false
          this.ismab=false
          this.goodsList=this.goodsList.filter((item)=>{
            return item.type=="生活用品"&&item.buyer==null
          })
        }else if(key=="饮食"){
          this.isall=false
          this.ishousehold_goods=false
          this.isdiet=true
          this.isdress=false
          this.isdigital=false
          this.ishome_appliances=false
          this.ismab=false
          this.goodsList=this.goodsList.filter((item)=>{
            return item.type=="饮食"&&item.buyer==null
          })
        }else if(key=="服饰"){
          this.isall=false
          this.ishousehold_goods=false
          this.isdiet=false
          this.isdress=true
          this.isdigital=false
          this.ishome_appliances=false
          this.ismab=false
          this.goodsList=this.goodsList.filter((item)=>{
            return item.type=="服饰"&&item.buyer==null
          })
        }else if(key=="数码"){
          this.isall=false
          this.ishousehold_goods=false
          this.isdiet=false
          this.isdress=false
          this.isdigital=true
          this.ishome_appliances=false
          this.ismab=false
          this.goodsList=this.goodsList.filter((item)=>{
            return item.type=="数码"&&item.buyer==null
          })
        }else if(key=="家电"){
          this.isall=false
          this.ishousehold_goods=false
          this.isdiet=false
          this.isdress=false
          this.isdigital=false
          this.ishome_appliances=true
          this.ismab=false
          this.goodsList=this.goodsList.filter((item)=>{
            return item.type=="家电"&&item.buyer==null
          })
        }else if(key=="母婴"){
          this.isall=false
          this.ishousehold_goods=false
          this.isdiet=false
          this.isdress=false
          this.isdigital=false
          this.ishome_appliances=false
          this.ismab=true
          this.goodsList=this.goodsList.filter((item)=>{
            return item.type=="母婴"&&item.buyer==null
          })
        }
      })
    },
    // 搜索商品列表
    search_by_kwd(){
      this.isall=true
      this.ishousehold_goods=false
      this.isdiet=false
      this.isdress=false
      this.isdigital=false
      this.ishome_appliances=false
      this.ishome_appliances=false
      this.$axios.post("/api/searchGoodsList",this.kwd).then((res)=>{
        res.data.forEach(item=>{
          item.img=item.img.split(',')
        })
        this.goodsList=res.data
        this.goodsList=this.goodsList.filter((item)=>{
          return item.buyer==null
        })
      })
    }
  }
};
</script>

<style scoped>
.search {
  margin: 50px auto;
  width: 600px;
  height: 48px;
}

.search input {
  border: 0;
  outline: 0;
  height: 48px;
  width: 500px;
  outline: #ee3f4d solid 1px;
  border-radius: 100px 0 0 100px;
  font-size: 20px;
  caret-color: #ee3f4d;
  padding-left: 20px;
  float: left;
  box-sizing: border-box;
}

.search button {
  border: 0;
  outline: 0;
  box-sizing: border-box;
  float: right;
  width: 100px;
  height: 48px;
  outline: #ee3f4d solid 1px;
  border-radius: 0 100px 100px 0;
  background-color: #ee3f4d;
  color: aliceblue;
  font-size: 17px;
  cursor: pointer;
}

.classify{
  height: 60px;
  margin-left: 30px;
}

.classify li{
  float: left;
  box-sizing: border-box;
  color: #000000;
  height: 60px;
  margin: 0 25px;
  font-size: 20px;
  font-weight: 700;
  line-height: 60px;
}

.classify li:hover {
  color: #ee3f4d;
  border-bottom: 2px solid #ee3f4d;
  cursor: pointer;
}

.active {
  color: #ee3f4d;
  border-bottom: 2px solid #ee3f4d;
}

.content{
  margin-top: 30px;
  margin-left: 20px;
  display: flex;
  flex-wrap:wrap;
}

.content li{
  display: inline-block;
  
  width: 20%;
}
</style>
