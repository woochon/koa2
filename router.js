const router = require('koa-router')();
const userController =    require('./controller/user');
const articleController = require('./controller/article');


module.exports = (app)=>{
    router.get('/',userController.index);
    router.get('/add',userController.add);
    router.post('/doAdd',userController.doAdd);
    router.get('/editor',userController.editor);
    router.post('/doEditor',userController.doEditor);
    router.get('/remove',userController.remove);
    router.get('/json',userController.json);
    router.get('/getCategoryList',articleController.getCategoryList);

// 调用路由中间件
    app.use(router.routes()).use(router.allowedMethods());
};
