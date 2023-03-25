<template>
 <div class="A_Goods">
            <!-- 头部信息 -->
            <div class="goods_head">
              <h2>{{goods.title}}</h2>
              <div class="goods_type">{{ goods.type }}</div>
              <p>{{ goods.goodsee }}</p>
              <span class="iconfont icon-geren"></span>
            </div>
            <!-- 详细信息 -->
            <div class="goods_detail">
              <!-- 细节描述 -->
              <div class="detail_info">
                <span class="iconfont icon-duihuaxinxi"></span>
                <h3 class="info_head">详细信息</h3>
                <p class="info_content">{{ goods.detail }}</p>
                <img :src="goods.img[0]" alt="" v-if="goods.img[0]">
                <img :src="goods.img[1]" alt="" v-if="goods.img[1]">
                <img :src="goods.img[2]" alt="" v-if="goods.img[2]">
              </div>

              <!-- 时间 -->
              <div class="time">
                <span class="iconfont icon-shijian"></span>
                <h3 class="detail_time">时间</h3>
                <p class="detail_time">
                发布商品：<br/>{{ goods.begin }}
                </p>
                <p class="detail_time" v-if="goods.buyer">
                交易结束：<br/>{{ goods.end }}
                </p>
              </div>
             
              <!-- 买家 -->
              <div class="buyer" v-if="goods.buyer">
                <span class="iconfont icon-geren"></span>
                <h2 class="detail_loca">买家：{{ goods.buyer }}</h2>
              </div>

              <!-- goodsBtn -->
              <div class="btnGroup">
                  <div v-if="!goods.end">
                    <button class="btn_cancel" @click="Cancel_Goods(goods.goods_id)" v-show="cancel&&!goods.buyer">取消</button>
                  </div>
                  <div>
                    <button class="btn_goods" @click="Accomplish_Goods(goods.goods_id)" v-show="cancel&&goods.buyer&&!goods.end">完成</button>
                  </div>
                  <div>
                    <button class="btn_goods" @click="Take_Goods(goods.goods_id)" v-show="!cancel">购买</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>

<script>
import qs from "qs";

export default {
  name: "AGoods",
  props: ['goods','cancel'],
  mounted(){
    this.goods.img=this.goods.img.split(",")
    // console.log('111',this.goods)
  },
  methods: {
  //  购买商品
    Take_Goods(goods_id) {
      this.$axios
        .post(
          "/api/Take_Goods",
          qs.stringify({
            goods_id: parseInt(goods_id),
            uid: parseInt(window.sessionStorage.getItem("UserID")),
            uname: window.sessionStorage.getItem("UserNAME"),
          })
        )
        .then((res) => {
          if (res.data.success === 1) {
            alert("购买成功,请和卖家进行线下交易!");
            window.open(`../../GoodsMall.html`, `_self`);
          } else if (res.data.success === -1) alert("购买失败");
        });
    },
    // 取消商品
    Cancel_Goods(goods_id) {
      this.$axios
        .post(
          "/api/Cancel_Goods",
          qs.stringify({
            goods_id: goods_id,
          })
        )
        .then((res) => {
          if (res.data.success === 1) {
            alert("取消成功");
            window.open(`../../myGoods.html`, `_self`);
          } else if (res.data.success === -1) alert("取消失败");
        });
    },
    // 交易完成
    Accomplish_Goods(goods_id) {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      let end=yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss
      this.$axios
        .post(
          "/api/Accomplish_Goods",
          qs.stringify({
            goods_id: parseInt(goods_id),
            end:end,
          })
        )
        .then((res) => {
          if (res.data.success === 1) {
            alert("交易完成!");
            window.open(`../../myGoods.html`, `_self`);
          } else if (res.data.success === -1) alert("交易出错，请稍后再试！");
        });
    },
  },
};
</script>

<style scoped>
.A_Goods {
  background-color: #f9f9f9;
  width: 260px;
  margin: 0 20px 50px 20px;
  border-radius: 10px;
  box-shadow: 0 0 25px rgb(38, 37, 37, 0.12);
}

.goods_head {
  background-color: #ee3f4d;
  padding: 20px 32px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.goods_head h2 {
  font-weight: normal;
  font-size: 26px;
  margin-bottom: 15px;
  color: #fff;
}

.goods_head div.goods_type {
  float: left;
  font-size: 15px;
  padding: 6px 15px;
  border-radius: 100px;
  background-color: #fff;
}

.goods_head span {
  float: right;
  line-height: 32px;
  color: #fff;
  font-size: 20px;
  margin-right: 3px;
}

.goods_head p {
  float: right;
  font-size: 16px;
  font-weight: 300;
  line-height: 32px;
  color: #fff;
}

.goods_detail {
  padding: 10px 20px;
}

.goods_detail span {
  float: left;
  color: var(--color-base);
  font-size: 20px;
  margin-right: 10px;
}

.goods_detail h2 {
  font-size: 16px;
  font-weight: normal;
}
.goods_detail h3 {
  font-weight: bold;
  font-size: 16px;
}

.detail_info {
  margin-bottom: 20px;
}

.detail_info img{
  display: inline-block;
  width: 73px;
}

.detail_info h3 {
  font-weight: bold;
  margin-bottom: 5px;
}

.info_content {
  line-height: 28px;
}

.time{
  margin-bottom: 20px;
}

.detail_time {
  margin-bottom: 5px;
}
.buyer{
  margin-bottom: 20px;
}

.detail_loca {
  margin-top: 10px;
}
.btnGroup {
  height: 32px;
}
.btnGroup button {
  font-size: 18px;
  padding: 3px 20px;
  border-radius: 100px;
  cursor: pointer;
}
.btn_goods {
  float: right;
  border: #ee3f4d 1px solid;
  background-color: #ee3f4d;
  color: #ffffff;
  margin:0 0 0 60px;
}
.btn_goods:hover {
  background-color: #ffffff;
  color: #ee3f4d;
}
.btn_cancel {
  float: left;
  border: #c0bfbf 1px solid;
  background-color: #fff;
  color: #c0bfbf;
}
.btn_cancel:hover {
  border: #c0bfbf 1px solid;
  background-color: #b1adad;
  color: #ffffff;
  transition: 0.2s;
}
.btn_finish {
  float: right;
  border: #f37521 1px solid;
  background-color: #f37521;
  color: #ffffff;
}
</style>