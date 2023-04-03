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
      <li @click="getMyGoodsList('solding')" class="in_tag" :class="{ active: issolding }">交易中</li>
      <li @click="getMyGoodsList('solded')" class="in_tag" :class="{ active: issolded }">卖出</li>
      <li @click="getMyBuyGoodsList('buying')" class="in_tag" :class="{ active: isbuying }">购买中</li>
      <li @click="getMyBuyGoodsList('buyed')" class="in_tag" :class="{ active: isbuyed }">购买完成</li>
    </ul>

    <!--我的商品展示-->
    <ul class="content">
      <li v-for="goods in myGoodsList" :key="goods.goods_id">
        <AGoods :goods="goods"  :mygoods="mygoods" @getChangeGoodsFlag="getChangeGoodsFlag"/>
      </li>
    </ul>

    <!--修改商品信息弹窗-->
    <el-dialog title="" :visible.sync="dialogFormVisible" :show-close=false>
      <div class="content_area">
      <div>修改商品信息</div>
        <div class="type">1.商品类型
        <select class="select" v-model="goods[0].type">
           <option value="生活用品">生活用品</option>
           <option value="饮食">饮食</option>
           <option value="服饰">服饰</option>
           <option value="数码">数码</option>
           <option value="家电">家电</option>
           <option value="母婴">母婴</option>
        </select>
      </div>
      <div class="title">2.商品名称：<input type="text" v-model="goods[0].title"></div>
      <div class="price">3.价格：<input type="text" v-model="goods[0].price"></div>
      <div class="goodsnewold">4.成新率：<input type="text" v-model="goods[0].goodsnewold"></div>
      <div class="detail">5.详细信息:<input type="text" v-model="goods[0].detail"></div>
      <el-upload action="http://localhost:8888/uploads" list-type="picture-card" class="upload" :auto-upload="true" :on-success="img_success" :limit="3" ref="uploadImage"
       :on-change="handleEditChange" :on-remove="handleRemove" :class="{hide:hideUploadEdit}" :file-list="goods[0].img">
            <i slot="default" class="el-icon-plus"></i> 
            <div slot="file" slot-scope="{ file }" id="upload_img" >
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="Change_Goods_Info(goods[0].goods_id)">确 定</el-button>
      </div>
    </el-dialog>

    <Footer />
  </div>
</template>

<script>
import Nav from "../../components/Nav.vue";
import Banner from "../../components/Banner";
// import Tag from "../../components/Tag";
import Footer from "../../components/Footer";
import AGoods from "../../components/AGoods.vue";
import qs from "qs";
import Vue from "vue";
import { Button, Dialog ,Upload} from "element-ui";
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Upload);


export default {
  name: "MyGoods",
  data(){
    return{
      myGoodsList:[],
      uid:window.sessionStorage.getItem("UserID"),
      mygoods:true,//是否在我的商品页面
      isunsold:true,//未卖出，动态添加class
      issolding:false,//卖出，动态添加class
      issolded:false,//卖出，动态添加class
      isbuying:false,//购买中
      isbuyed:false,//购买完成
      dialogFormVisible :false,
      hideUploadEdit:false,//上传图片的加号显示标志
      FileUpload1:'',
      dialogImageUrl: "",
      disabled: false,
      imgurl:[],
      goods:[
        {
          type:'',
          title:'',
          detail: "",
          img: [{
            name:'',
            url:''
          },
          {
            name:'',
            url:''
          },
          {
            name:'',
            url:''
          }],
          price: '',
          goodsnewold: '',
        }
      ]
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
    // this.$axios.post('/img').then((res)=>{
    //   console.log(res.data)
    // })
  },
  methods:{
    getChangeGoodsFlag(goods_id){
      this.$axios.post("/api/searchGoods",goods_id).then((res)=>{
        this.goods=res.data
        this.imgurl=this.goods[0].img.split(",")
        this.goods[0].img=[]
        this.imgurl.forEach(item=>{
           this.goods[0].img.push({
            name:item.slice(43),
            url:item
           })
        })
        console.log(this.goods[0].img)
      })
        this.dialogFormVisible=true
    },
    // 获取自己商品的列表
    getMyGoodsList(flag){
      this.$axios.post("/api/searchMyGoodsList",this.uid).then((res)=>{
        console.log(res.data)
        // 判断要展示的为未卖出的还是卖出的
        // 未卖出
        if(flag=='unsold'){
        res.data=res.data.filter(item=>{
            return item.buyer==null
          })
        // console.log(res.data)
          this.myGoodsList=res.data
          this.isunsold=true
          this.issolding=false
          this.issolded=false
          this.isbuying=false
          this.isbuyed=false
          // 交易中
        }else if(flag=='solding'){
          res.data=res.data.filter(item=>{
            return item.buyer!=null&&item.end==null
          })
          this.myGoodsList=res.data
          this.isunsold=false
          this.issolding=true
          this.issolded=false
          this.isbuying=false
          this.isbuyed=false
          // 卖出
        }else if(flag=='solded'){
          res.data=res.data.filter(item=>{
            return item.end!=null
          })
          this.myGoodsList=res.data
          this.isunsold=false
          this.issolding=false
          this.issolded=true
          this.isbuying=false
          this.isbuyed=false
        }
      })
    },
    // 获取自己购买商品的列表
    getMyBuyGoodsList(flag){
       this.$axios.post("/api/searchMyBuyGoodsList",this.uid).then((res)=>{
        console.log(res.data)
        // 购买中
        if(flag=='buying'){
          res.data=res.data.filter(item=>{
            return item.end==null
          })
          this.myGoodsList=res.data
          this.isunsold=false
          this.issolding=false
          this.issolded=false
          this.isbuying=true
          this.isbuyed=false
        }
        // 购买完成
        else if(flag=='buyed'){
          res.data=res.data.filter(item=>{
            return item.end!=null
          })
          this.myGoodsList=res.data
          this.isunsold=false
          this.issolding=false
          this.issolded=false
          this.isbuying=false
          this.isbuyed=true
        }
      })
    },
    //修改商品信息取消按钮
  close(){
  this.dialogFormVisible  = false
  },
  //修改商品信息确定按钮
  Change_Goods_Info(goods_id){
    console.log(goods_id)
     this.$axios
      .post(
        "/api/Change_Goods_Info",
        qs.stringify({
          type:this.goods[0].type,
          title:this.goods[0].title,
          detail:this.goods[0].detail,
          price:this.goods[0].price,
          goodsnewold:this.goods[0].goodsnewold,
          img:this.imgurl.join(','),
          goods_id: goods_id,
        })
      )
      .then((res) => {
        if (res.data.success === 1) {
          alert("修改商品信息成功！");
          window.open(`../../myGoods.html`, `_self`);
        } else if (res.data.success === -1) alert("修改商品信息失败！");
      });
  },
    handleRemoveImage(file) {
      this.$refs.uploadImage.handleRemove(file)
      let file_url=file.url
      this.goods_img=this.goods_img.filter(item=>{
        return item==file_url
      })
    },
    img_success(response, file, fileList){
      console.log('111',response, file, fileList)
      this.goods[0].img.push({
            name:response.url.slice(43),
            url:response.url
           })
      this.imgurl.push(response.url)
      console.log(fileList)
    },
    
    handleEditChange(file, fileList) {
      console.log('1111111',fileList)
      this.hideUploadEdit = fileList.length >= 3
    },
    handleRemove(file, fileList) {
      this.hideUploadEdit =false
      this.goods[0].img=fileList
      this.imgurl=this.imgurl.filter(item=>{
        return item!=file.url
      })
    },
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

.content_area>div{
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
}
.content_area>div:first-child{
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;
}
.content_area>div>select{
  font-size: 18px;
}
.content_area>div>input{
  border: 0;
  font-size: 18px;
}
</style>
