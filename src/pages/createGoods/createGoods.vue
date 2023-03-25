<template>
  <div id="createGoods">
    <Nav activePage="createGoods" />
    <Banner page="createGoods" title="发布商品" discribtion="在这里，尽情进行二手交易"/>
    <createAGoods />
    <Footer />
    
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import createAGoods from "./components/createAGoods";
import Footer from "../../components/Footer";


export default {
  name: "createGoods",
  components: {
    Nav,
    Banner,
    createAGoods,
    Footer,
  },
};
</script>

<style>
</style>
