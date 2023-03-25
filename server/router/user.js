const express = require('express');
const route = express.Router();
const pool = require('../db/db')

//登录
route.post("/api/login", (req, res) => {
    // let sqlStr = sql.user.login;
    let sqlStr = "SELECT * FROM campus_secondhand_transaction.user where user_id=?;"
    let params = req.body;

    // 连接
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        console.log("User log in: ", params)
        // 判断是否为空
        if (params.user_id === '' || params.pswd === '')
            res.send({success:-1,str:'账号或者密码不可为空！'});
        else {
            connection.query(sqlStr, [
                params.user_id,
            ], function (error, results) {
                let resDate = results[0]
                // console.log('wwwwwwwwww',resDate)
                if(params.pswd!==resDate.psd)
                res.send({success:0,str:'账号或者密码有误！'});
                else{
                    console.log('aaa',resDate.name)
                    res.send({success:1,str:resDate.name})
                }
                connection.release();
            });
        }
    });
})
// 获取信息
route.post("/api/get_UserInfo", (req, res) => {
    let sqlStr = "SELECT * FROM user where user_id = ?;"

    // 连接
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sqlStr, parseInt(req.body.uid), function (error, results) {
            res.send(results);
            connection.release();
            if (error) throw error;
        });

    });
})
// 修改信息
route.post("/api/change_UserInfo", (req, res) => {
    let sqlStr = 'update user set name=? , gender=? , age=? , grade=? , college=? , dormitory=? , email=? , phone=? where user_id=?;'
    let params = req.body;
    console.log(params)

    // 连接
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sqlStr, [
            params.u_name,
            params.gender,
            params.age,
            params.grade,
            params.college,
            params.dormitory,
            params.email,
            params.phone,
            params.uid,
        ], function (results) {
            if (res)
                res.send({ success: 1 });
            else
                res.send({ success: -1 });
            connection.release();
        });

    });
})
// 修改密码
route.post("/api/changepwd", (req, res) => {
    
    let sqlStr = 'update user set psd=? where user_id=? and psd=?;'
    let params = req.body;
    // console.log(params)

    // 连接
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sqlStr, [
            params.newpwd,
            params.uid,
            params.oldpwd,
        ], function (error,results) {
            if (results.affectedRows === 1)
                res.send('修改密码成功！');
            else
                res.send('修改密码失败！');
            connection.release();
        });

    });
})
// 注册
route.post("/api/Register", (req, res) => {
    let sqlStr = 'insert into user(name,age,gender,grade,college,dormitory,email,phone,psd) values (?,?,?,?,?,?,?,?,?)'
    let params = req.body;
    // 连接
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sqlStr, [
            params.u_name,
            parseInt(params.age),
            params.gender,
            parseInt(params.grade),
            params.college,
            params.dormitory,
            params.email,
            params.phone,
            params.psd,
        ], function (error, results) {
            if (error) {
                res.send({ success: -1});
            }
            else {
                console.log(results)
                res.send(results);
            }
            connection.release();
        });

    });
})

module.exports = route;
