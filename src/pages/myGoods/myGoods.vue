<template>
  <div id="MyGoods">
    <Nav activePage="MyGoods" />
    <Banner
      page="MyGoods"
      title="我的商品"
      discribtion="在这里，及时查看自己发布的商品"
    />

    <!--卖出未卖出标志-->
    <ul class="flag">
      <li @click="getMyGoodsList('unsold')" class="in_tag" :class="{ active: isunsold }">未卖出</li>
      <li @click="getMyGoodsList('sold')" class="in_tag" :class="{ active: issold }">卖出</li>
    </ul>

    <!--我的商品展示-->
    <ul class="content">
      <li v-for="goods in myGoodsList" :key="goods.goods_id">
        <AGoods :goods="goods"  :cancel="cancel"/>
      </li>
    </ul>

    <Footer />
  </div>
</template>

<script>
import Nav from "../../components/Nav.vue";
import Banner from "../../components/Banner";
// import Tag from "../../components/Tag";
import Footer from "../../components/Footer";
import AGoods from "../../components/AGoods.vue";

export default {
  name: "MyGoods",
  data(){
    return{
      myGoodsList:[],
      uid:window.sessionStorage.getItem("UserID"),
      cancel:true,//取消按钮是否显示
      isunsold:true,//未卖出，动态添加class
      issold:false//卖出，动态添加class
    }
  },
  components: {
    Nav,
    Banner,
    Footer,
    AGoods
  },
  mounted(){
    this.getMyGoodsList('unsold')
    this.$axios.post('/img').then((res)=>{
      console.log(res.data)
    })
  },
  methods:{
    // 获取自己商品的列表
    getMyGoodsList(flag){
      this.$axios.post("/api/searchMyGoodsList",this.uid).then((res)=>{
        // console.log(res.data)
        // 判断要展示的为未卖出的还是卖出的
        // 未卖出
        if(flag=='unsold'){
        res.data=res.data.filter(item=>{
            return item.end==null
          })
        // console.log(res.data)
          this.myGoodsList=res.data
          this.isunsold=true
          this.issold=false
          // 卖出
        }else if(flag=='sold'){
          res.data=res.data.filter(item=>{
            return item.end!=null
          })
          this.myGoodsList=res.data
          this.isunsold=false
          this.issold=true
        }
      })
    }
  }
};
</script>

<style scoped>
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

.flag{
  height: 60px;
  margin-left: 30px;
}

.in_tag {
  float: left;
  box-sizing: border-box;
  color: #000000;
  height: 60px;
  margin: 0 25px;
  font-size: 20px;
  font-weight: 700;
  line-height: 60px;
}

.in_tag:hover {
  color: #ee3f4d;
  border-bottom: 2px solid #ee3f4d;
  cursor: pointer;
}

.active {
  color: #ee3f4d;
  border-bottom: 2px solid #ee3f4d;
}
</style>
