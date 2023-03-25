<template>
  <div id="GoodsMall">
    <Nav activePage="GoodsMall" />
    <Banner page="GoodsMall" title="交易大厅" discribtion="在这里寻找需要的商品"/>

    <!--搜索商品-->
    <div class="search">
          <input type="text" placeholder="搜索商品" v-model="kwd" />
          <button class="iconfont icon-sousuo" @click="search_by_kwd()">搜索</button>
        </div>

    <ul class="content">
      <li v-for="goods in goodsList" :key="goods.goods_id" v-show="!goods.buyer">
        <AGoods :goods="goods" :goodsee="goodsee"/>
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
      kwd:'',
      cancel:false//取消按钮显示与否标志
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
      })
    },
    // 搜索商品列表
    search_by_kwd(){
      this.$axios.post("/api/searchGoodsList",this.kwd).then((res)=>{
        res.data.forEach(item=>{
          item.img=item.img.split(',')
        })
        this.goodsList=res.data
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
