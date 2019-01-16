const router = require('koa-router')();
const userController =    require('./controller/user');
const articleController = require('./controller/article');

/*const multer = require('koa-multer');
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, './images/avatar/')  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//加载配置
const upload = multer({ storage: storage });*/


module.exports = (app)=>{
    router.get('/',userController.index);
    router.get('/add',userController.add);
    router.post('/doAdd',userController.doAdd);
    router.get('/editor',userController.editor);
    router.post('/doEditor',userController.doEditor);
    router.get('/remove',userController.remove);
    router.get('/json',userController.json);


    router.post('/login',userController.login);
    router.get('/getIdentityCode',userController.getIdentityCode);
    router.post('/getUserInfo',userController.userInfo);
    router.post('/uploadAvatar',userController.uploadAvatar);

    router.post('/getCategoryList',articleController.getCategoryList);
    router.post('/addCategory',articleController.addCategory);

// 调用路由中间件
    app.use(router.routes()).use(router.allowedMethods());
};
