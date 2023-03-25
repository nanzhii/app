module.exports = {
    // 关闭eslint
    lintOnSave:false,
    pages: {
        // 先配置主页
        index: {
            entry: './src/main.js',
            template: './public/index.html',
            title: '主页'
        },
        // 再配置各个子页面
        createGoods: {
            entry: './src/pages/createGoods/createGoods.js',
            template: './public/createGoods.html',
            title: '发布商品'
        },
        GoodsMall: {
            entry: './src/pages/GoodsMall/GoodsMall.js',
            template: './public/GoodsMall.html',
            title: '交易大厅'
        },
        myGoods: {
            entry: './src/pages/myGoods/myGoods.js',
            template: './public/myGoods.html',
            title: '我的商品'
        },
        Personnal: {
            entry: './src/pages/Personnal/Personnal.js',
            template: './public/Personnal.html',
            title: '个人信息'
        },
        Register: {
            entry: './src/pages/Register/Register.js',
            template: './public/Register.html',
            title: '注册'
        },
    },
    publicPath: './'
}
