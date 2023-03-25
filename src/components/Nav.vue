<template>
  <div id="Nav">
    <nav>
      <ul class="content_area">
        <li>
          <a href="/createGoods.html" :class="{ active: createGoods }"
            >发布商品</a
          >
        </li>
        <li>
          <a href="/GoodsMall.html" :class="{ active: GoodsMall }">交易大厅</a>
        </li>
        <li><a href="/myGoods.html" :class="{ active: MyGoods }">我的商品</a></li>
        <li>
          <a
            href="/Personnal.html"
            class="iconfont icon-geren"
            :class="{ active: Personnal }"
            >个人信息</a
          >
        </li>
      </ul>
      <p>校园二手交易平台</p>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    activePage: String,
  },
  computed: {
    createGoods() {
      if (this.activePage === "createGoods") return true;
      else return false;
    },
    GoodsMall() {
      if (this.activePage === "GoodsMall") return true;
      else return false;
    },
    MyGoods() {
      if (this.activePage === "MyGoods") return true;
      else return false;
    },
    Personnal() {
      if (this.activePage === "Personnal") return true;
      else return false;
    },
  },
};
</script>

<style scoped>
@import "../assets/css/reset.css";
@import "../assets/ttf/iconfont.css";

nav {
  height: 80px;
  width: 100%;
  position: relative;
  background-color: rgb(255, 255, 255);
}

ul {
  overflow: hidden;
  margin: 0 auto;
  padding: auto 0;
}

ul li {
  float: left;
}

ul li:nth-child(4) {
  float: right;
}
ul li:nth-child(4) a {
  width: 120px;
}

ul li a {
  display: inline-block;
  width: 100px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #c02c38;
  font-size: 18px;
  transition: 0.2s;
}

ul li a:hover {
  background-color: #c02c38;
  color: #fff;
}
.active {
  background-color: #c02c38;
  color: #fff;
}

p {
  height: 80px;
  display: block;
  position: absolute;
  left: 48%;
  margin: -60px 0 0 -79px;
  font-size: 30px;
  font-weight: 700;
  color: #c02c38;
}
</style>
