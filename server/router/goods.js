const express = require('express');
const route = express.Router();
const pool = require('../db/db');
const { query } = require('express');



//发布商品
route.post("/api/createGoods", (req, res) => {
    let sqlStr = 'INSERT INTO goods(goodsee,goodsee_id,type,title,detail,price,goodsnewold,img,begin) VALUES (?,?,?,?,?,?,?,?,?)';
    let params = req.body;
    // console.log('111',params)

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sqlStr, [
            params.goodsee,
            params.goodseeid,
            params.goods_type,
            params.goods_title,
            params.goods_detail,
            params.goods_price,
            params.goods_goodsnewold,
            params.goods_img,
            params.begin
        ], function (error, results) {
            if (results === undefined)
                res.send({ success: -1 });
            else {
                let resDate = results[0]
                res.send(resDate);
            }
            connection.release();
        });
    });
})

//获取未卖出商品列表（交易大厅展示）
route.get("/api/getGoodsList", (req, res) => {
    let sqlStr = 'SELECT * FROM campus_secondhand_transaction.goods;'
    pool.getConnection(function (err, connection){
        if (err) throw err;
        connection.query(sqlStr,function (error, results){
            res.send(results);
            connection.release();
        })
    })
})

// 搜索商品列表进行展示（交易大厅）
route.post("/api/searchGoodsList", (req, res) => {
    let sqlStr = 'SELECT * FROM campus_secondhand_transaction.goods where title like ?;'
    let kwd ="%" +Object.getOwnPropertyNames(req.body)+ "%"
    // console.log('111',kwd)
    //连接数据库
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        // 查询
        connection.query(sqlStr, kwd, function (error, results) {
            // console.log(results)
            res.send(results)
            connection.release();
        });
    });
})
// 我的商品列表进行展示
route.post("/api/searchMyGoodsList", (req, res) => {
    let sqlStr = 'SELECT * FROM campus_secondhand_transaction.goods where goodsee_id=?;'
    let uid =Object.getOwnPropertyNames(req.body)
    // console.log('111',uid)
    //连接数据库
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        // 查询
        connection.query(sqlStr, uid, function (error, results) {
            // console.log('222',results)
            res.send(results)
            connection.release();
        });
    });
})

// 我的购买商品列表进行展示
route.post("/api/searchMyBuyGoodsList", (req, res) => {
    let sqlStr = 'SELECT * FROM campus_secondhand_transaction.goods where buyer_id=?;'
    let uid =Object.getOwnPropertyNames(req.body)
    // console.log('111',uid)
    //连接数据库
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        // 查询
        connection.query(sqlStr, uid, function (error, results) {
            // console.log('222',results)
            res.send(results)
            connection.release();
        });
    });
})
// 获取单个商品信息
route.post("/api/searchGoods", (req, res) => {
    let sqlStr = 'SELECT * FROM campus_secondhand_transaction.goods where goods_id=?;'
    let goods_id =Object.getOwnPropertyNames(req.body)
    console.log('111',goods_id)
    //连接数据库
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        // 查询
        connection.query(sqlStr, goods_id, function (error, results) {
            console.log('222',results)
            res.send(results)
            connection.release();
        });
    });
})
// 修改我的商品信息
route.post("/api/Change_Goods_Info", (req, res) => {
    let sqlStr = 'update goods set type=? , title=? , detail=? , price=? , goodsnewold=? , img=? where goods_id=?;'
    let params = req.body;
    console.log('qqqqqqqq',params)
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sqlStr, [
            params.type,
            params.title,
            params.detail,
            params.price,
            params.goodsnewold,
            params.img,
            params.goods_id,
        ], function (error, results) {
            if (results.affectedRows === 1)
                res.send({ success: 1 });
            else {
                res.send({ success: -1 });
            }
            connection.release();
        });

    });
})
//购买
route.post("/api/Take_Goods", (req, res) => {
    let sqlStr = 'update goods set buyer=? , buyer_id=? where goods_id=?;'
    let params = req.body;
    // console.log('qqqqqqqq',params)
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sqlStr, [
            params.uname,
            params.uid,
            params.goods_id
        ], function (error, results) {
            if (results.affectedRows === 1)
                res.send({ success: 1 });
            else {
                res.send({ success: -1 });
            }
            connection.release();
        });

    });
})
//删除商品
route.post("/api/Cancel_Goods", (req, res) => {
    let sqlStr = 'delete FROM campus_secondhand_transaction.goods where goods_id=?;';
    let params = req.body;
    // console.log(params)
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sqlStr, [
            params.goods_id,
        ], function (error, results) {
            if (results.affectedRows === 1)
                res.send({ success: 1 });
            else {
                res.send({ success: -1 });
            }
            connection.release();
        });

    });
})
//取消购买
route.post("/api/Cancel_BuyGoods", (req, res) => {
    let sqlStr = 'update goods set buyer=null , buyer_id=null where goods_id=?;';
    let params = req.body;
    // console.log(params)
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sqlStr, [
            params.goods_id,
        ], function (error, results) {
            if (results.affectedRows === 1)
                res.send({ success: 1 });
            else {
                res.send({ success: -1 });
            }
            connection.release();
        });

    });
})
//完成
route.post("/api/Accomplish_Goods", (req, res) => {
    let sqlStr = 'update goods set end=? where goods_id=?;'
    let params = req.body;
    console.log('qqqqqqqq',params)
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sqlStr, [
            params.end,
            params.goods_id,
        ], function (error, results) {
            console.log(results)
            if (results.affectedRows === 1)
                res.send({ success: 1 });
            else {
                res.send({ success: -1 });
            }
            connection.release();
        });

    });
})

module.exports = route;
