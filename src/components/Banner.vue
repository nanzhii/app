<template>
  <div id="Banner">
    <div class="banner" :style="findimg">
      <div class="content_area">
        <div class="discribtion">
          <h1>{{ title }}</h1>
          <p>{{ discribtion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    page: String,
    title: String,
    discribtion: String,
  },
  computed: {
    findimg() {
      if (this.page === "createGoods")
        return {
          display: "flex",
          alignItems: "center",
          justifycContent: "center",
          height: "300px",
          backgroundColor: "rgb(128, 103, 103)",
          background: "url(/img/createGoods.png) center center",
        };
      else if (this.page === "GoodsMall")
        return {
          display: "flex",
          alignItems: "center",
          justifycContent: "center",
          height: "300px",
          backgroundColor: "rgb(128, 103, 103)",
          background: "url(/img/GoodsMall.png) center center",
        };
      else if (this.page === "MyGoods")
        return {
          display: "flex",
          alignItems: "center",
          justifycContent: "center",
          height: "300px",
          backgroundColor: "rgb(128, 103, 103)",
          background: "url(/img/MyGoods.png) center center",
        };
      else if (this.page === "Personnal")
        return {
          display: "flex",
          alignItems: "center",
          justifycContent: "center",
          height: "300px",
          backgroundColor: "rgb(128, 103, 103)",
          background: "url(/img/Personnal.png) center center",
        };
      else return "";
    },
  },
};
</script>

<style >


.discribtion {
  text-align: center;
  margin: auto;
  color: aliceblue;
}

.discribtion h1 {
  padding: 0 0 10px 0;
  font-weight: normal;
  letter-spacing: 3px;
}

.discribtion p {
  letter-spacing: 5px;
}
</style>