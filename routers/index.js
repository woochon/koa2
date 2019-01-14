const router = require('koa-router')();
const user =    require('./user');


module.exports = (app)=>{
    /*router.get('/',async (ctx)=>{
        ctx.body="haha";
    });*/
    router.use('/user',user);

// 调用路由中间件
    /*app.use(router.routes());*/
    /*app.use(router.allowedMethods());*/
    /*app.use(router.routes()).use(router.allowedMethods());*/
};
