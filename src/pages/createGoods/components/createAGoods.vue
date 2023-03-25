<template>
  <div class="tmp">
    <div class="content_area">
      <div class="type">
        <div class="head">
          <div>1</div>
          <h2>商品类型</h2>
        </div>
        <select class="select" v-model="goods_type">
           <option value="生活用品">生活用品</option>
           <option value="饮食">饮食</option>
           <option value="服饰">服饰</option>
           <option value="数码">数码</option>
           <option value="家电">家电</option>
           <option value="母婴">母婴</option>
        </select>
      </div>
      <div class="title_detail">
        <div class="head">
          <div>2</div>
          <h2>商品名称及详细信息</h2>
        </div>
        <input
          type="text"
          v-model="goods_title"
          placeholder="输入商品名称（小于20字）"
        />
        <textarea
          type="text"
          v-model="goods_detail"
          placeholder="输入商品描述（小于500字）"
        ></textarea>
        <div class="goods_img">
          <el-upload action="http://localhost:8888/uploads" list-type="picture-card" class="upload" :auto-upload="true" :on-success="img_success" :limit="3" ref="uploadImage" :on-change="handleEditChange" :on-remove="handleRemove"
              :class="{hide:hideUploadEdit}">
            <i slot="default" class="el-icon-plus"></i> 
            <div slot="file" slot-scope="{ file }" id="upload_img" >
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
              <!--查看按钮-->
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
              <!--删除按钮-->
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemoveImage(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
      </div>
      <div class="price">
        <div class="head">
          <div>3</div>
          <h2>价格</h2>
        </div>
        <input
          type="number"
          v-model="goods_price"
          placeholder="输入价格（小于10字）"
        />
      </div>
      <div class="goodsnewold">
        <div class="head">
          <div>4</div>
          <h2>商品成新率</h2>
        </div>
        <input
          type="text"
          v-model="goods_goodsnewold"
          placeholder="输入商品成新率（整数1~10）"
        />
      </div>
      <button @click="submit">发布商品</button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import { Upload, Dialog } from "element-ui";
Vue.use(Upload);
Vue.use(Dialog);

export default {
  name: "createAGoods",
  data() {
    return {
      goods_type: "生活用品",
      goods_title: "",
      goods_detail: "",
      goods_img: [],
      goods_price: '',
      goods_goodsnewold: '',
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      goodseeid: window.sessionStorage.getItem("UserID"),
      goodsee: window.sessionStorage.getItem("UserNAME"),
      begin:'',//发布商品时间
      hideUploadEdit:false,//上传图片的加号显示标志
      FileUpload1:''
    };
  },
  methods: {
    handleRemoveImage(file) {
      this.$refs.uploadImage.handleRemove(file)
      let file_url=file.url
      this.goods_img=this.goods_img.filter(item=>{
        return item==file_url
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    img_success(response, file, fileList){
      console.log('111',response, file, fileList)
      this.goods_img.push(response.url)
      // console.log(response)
    },
    
    handleEditChange(file, fileList) {
      this.hideUploadEdit = fileList.length >= 3
    },
    handleRemove(file, fileList) {
      this.hideUploadEdit =false
    },
    // 提交
    submit() {
      // 获取当前时间
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      this.begin=yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss
      this.goods_price=parseInt(this.goods_price)
      this.goods_goodsnewold=parseInt(this.goods_goodsnewold)
      this.goodseeid=parseInt(this.goodseeid)
      this.goods_img=this.goods_img.join(',')
      // console.log(this._data)


      this.$axios
        .post("/api/createGoods",qs.stringify(this._data))
        .then((res) => {
          if (res.data.success === -1) alert("请重新输入商品信息！");
          else {
            alert("发布商品成功！");
            window.open(`../../createGoods.html`, `_self`);
          }
        });
    },
  },
};
</script>

<style>
.tmp {
  margin-left: 500px;
}

.head {
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 60px;
}

.head div {
  font-size: 20px;
  float: left;
  width: 35px;
  height: 35px;
  background-color: #ee3f4d;
  border-radius: 50%;
  text-align: center;
  line-height: 35px;
  color: aliceblue;
}

.head h2 {
  margin-left: 20px;
  font-size: 24px;
  color: #ee3f4d;
}

.select{
  display: inline-block;
  width: 520px;
  height: 48px;
  font-size: 18px;
  border-radius: 8px;
  margin: 15px 0 0 55px
}

.select option{
  font-size: 18px;
}

input {
  border: 0;
  outline: 0;
  height: 48px;
  width: 500px;
  outline: #707070 solid 1px;
  border-radius: 8px;
  margin: 15px 0 0 55px;
  font-size: 18px;
  padding-left: 20px;
  caret-color: #ee3f4d;
}

input:focus {
  outline: #ee3f4d solid 1px;
}

.type p {
  font-size: 15px;
  margin-left: 55px;
  margin-top: 10px;
  letter-spacing: 1px;
  color: #707070;
}

textarea {
  display: block;
  border: 0;
  outline: 0;
  height: 100px;
  width: 500px;
  outline: #707070 solid 1px;
  border-radius: 8px;
  margin: 15px 0 0 55px;
  font-family: Courier;
  font-size: 18px;
  padding-left: 20px;
  padding-top: 15px;
  caret-color: #ee3f4d;
}

textarea:focus {
  outline: #ee3f4d solid 1px;
}
button {
  display: block;
  margin: 90px 200px;
  width: 210px;
  height: 60px;
  background-color: #ee3f4d;
  border-radius: 35px;
  border: none;
  color: aliceblue;
  font-size: 28px;
  letter-spacing: 5px;
  font-weight: 500;
  box-shadow: 0 0 10px rgb(192, 44, 56, 0.36);
  cursor: pointer;
}
.title_detail .goods_img {
  display: inline-block;
  height: 148px;
  margin: 15px 0 0 55px;
  border: 1px solid black;
  border-radius: 8px;
}
.upload{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.hide .el-upload--picture-card {
    display: none;
  }
</style>