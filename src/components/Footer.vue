<template>
  <div id="footer">
    <div class="content_area">
      <div class="others">
        <p>校园二手交易平台</p>
        <div class="info">
          <div class="author">
            <h3 class="title">Designed By</h3>
            <div class="brk"></div>
            <span>武xx</span>
          </div>
          <div class="gitee">
            <h3 class="title">Phone</h3>
            <div class="brk"></div>
            <span>182******49</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style >
#footer {
  height: 200px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

#footer p {
  float: left;
  margin-right: 260px;
  font-size: 50px;
  font-weight: 700;
}

.others {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info {
  float: right;
}

.brk {
  height: 1px;
  width: 150px;
  border-bottom: 1px solid #404040;
  margin: 5px 0 10px 0;
}

.author,.gitee {
  display: inline-block;
  margin: 0 30px 0 30px;
}

.title {
  font-size: 26px;
  font-weight: 200;
}

.gitee .title {
  font-size: 24px;
}

a:visited {
  color: #404040;
}

a:hover {
  color: #ee3f4d;
}
</style>