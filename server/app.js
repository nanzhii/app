const express = require('express');
const userRouter = require("./router/user")
const goodsRouter = require("./router/goods")
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');


app.use( require('cors')() )
app.use(bodyParser.urlencoded({
	extended:false
}))
app.use(userRouter)
app.use(goodsRouter)



// 将uploads文件夹托管为静态文件
app.use('/uploads', express.static(__dirname+'/uploads'))
// 接收图片，并存放入uploads文件夹，然后返回图片的url地址，表单之后会将图片的url上传到服务器。
//上传图片必备中间件及文件夹
const multer = require('multer')
const upload = multer({dest:'./uploads'})
app.post('/uploads',upload.single('file'),  (req, res) => {
    console.log(req.file)
    const file = req.file

    const data=Date.now()+file.originalname
    file.url = 'http://localhost:8888/uploads/'+data
    // 更改上传到uploads文件夹中的名字
    fs.rename(file.path, "uploads/" +data, function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    console.log(file.url,data)
    res.send(file)
  })


app.listen(8888, (req, res) => {
    console.log("后端服务器启动于:")
    console.log("http://localhost:8888")
});