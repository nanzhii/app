<template>
  <div class="content_area">
    <div class="container">
      <div class="header">
        <p>个人信息</p>
      </div>

      <div class="other_info">
        <div class="msg">
          <span>姓名：</span>
          <input type="text" v-model="u_name" class="name" />
        </div>
        <div class="msg">
          <span>UID：</span>
          <input type="text" v-model="uid" class="uid" />
        </div>
        <div class="msg">
          <span>性别：</span>
          <input type="text" v-model="gender" class="gender" />
        </div>
        <div class="msg">
          <span>年龄：</span>
          <input type="text" v-model="age" class="age" />
        </div>
        <div class="msg">
          <span>年级：</span>
          <input type="text" v-model="grade" class="grade" />
        </div>
        <div class="msg">
          <span>学院：</span>
          <input type="text" v-model="college" class="college" />
        </div>
        <div class="msg">
          <span>宿舍楼：</span>
          <input type="text" v-model="dormitory" class="dormitory" />
        </div>
        <div class="msg">
          <span>邮箱：</span>
          <input type="text" v-model="email" class="email" />
        </div>
        <div class="msg">
          <span>电话：</span>
          <input type="text" v-model="phone" class="phone" />
        </div>
        <div class="msg">
        <el-button type="text" @click="dialogFormVisible  = true" class="buttonpwd">修改密码</el-button>
      </div>
      </div>

      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :show-close=false>
        旧密码：<input type="password" v-model="oldpwd">
        新密码：<input type="password" v-model="newpwd">
         <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="changepwd">确 定</el-button>
         </div>
      </el-dialog>

      <button @click="submit" class="submit">保存修改</button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import { Button, Dialog } from "element-ui";
Vue.use(Button);
Vue.use(Dialog);

export default {
  name: "UserInfo",
  data() {
    return {
      uid: window.sessionStorage.getItem("UserID"),
      u_name: "姓名",
      gender: "性别",
      age: "年龄",
      grade: "年级",
      college: "学院",
      dormitory: "宿舍",
      email: "邮箱",
      phone: "手机号",
      dialogFormVisible :false,
      oldpwd:'',
      newpwd:'',
    };
  },
  methods: {
    submit() {
      this.age=parseInt(this.age)
      this.grade=parseInt(this.grade)
      this.$axios
        .post("/api/change_UserInfo", qs.stringify(this._data))
        .then((res) => {
          if (res.data.success === -1) alert("更改失败,请稍后再试！");
          else {
            alert("个人信息修改成功！");
            window.open(`../../Personnal.html`, `_self`);
          }
        });
    },
    close(){
    this.dialogFormVisible  = false
    this.oldpwd=''
    this.newpwd=''
    },
    changepwd(){
    this.dialogFormVisible  = false
    this.$axios.post("/api/changepwd",qs.stringify({uid:parseInt(this.uid),oldpwd:this.oldpwd,newpwd:this.newpwd})).then((res)=>{
      alert(res.data)
    })
    this.oldpwd=''
    this.newpwd=''
  }
  },
  // 获取用户信息
  created() {
    this.$axios
      .post(
        "/api/get_UserInfo",
        qs.stringify({ uid: parseInt(window.sessionStorage.getItem("UserID")) })
      )
      .then((res) => {
        let info = res.data[0];

        this.u_name = info.name;
        this.gender = info.gender;
        this.age = info.age;
        this.grade = info.grade;
        this.college = info.college;
        this.dormitory = info.dormitory;
        this.email = info.email;
        this.phone = info.phone;
        this.goods_num = info.goods_num;
      });
  },
};
</script>

<style >
.container {
  background-color: #fff;
  margin-top: 100px;
  padding: 100px 100px;
  display: table;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(107, 107, 107, 0.1);
}

.container input {
  height: 60px;
  display: table-cell;
  outline: none;
  border: none;
}
.header {
  margin-bottom: 60px;
}
.header p {
  line-height: 50px;
  font-size: 50px;
  font-weight: bold;
  color: #ee3f4d;
  margin-bottom: 10px;
}

.other_info .msg{
display: inline-block;
width: 445px;
height: 110px;
}

.other_info .msg span {
  font-size: 25px;
  font-weight: 700;
  color: #ee3f4d;
}

.other_info .msg input {
  width: 290px;
  font-size: 25px;
  font-weight: 400;
  border-bottom: 1px solid #c1c1c1;
  padding-left: 20px;
  color: #ee3f4d;
}

.other_info .msg .buttonpwd{
  display: inline-block;
  color: #ee3f4d;
  font-size: 20px;
}

.submit {
  display: block;
  margin: 50px auto;
  width: 220px;
  height: 60px;
  background-color: #ee3f4d;
  border-radius: 35px;
  border: none;
  color: aliceblue;
  font-size: 28px;
  letter-spacing: 1px;
  font-weight: 500;
  box-shadow: 0 0 10px rgb(192, 44, 56, 0.36);
  cursor: pointer;
}
</style>