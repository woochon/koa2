const router = require('koa-router')();

router.get('/',async (ctx)=>{
    ctx.body='user首页'
});
router.get('/add',async (ctx)=>{
    ctx.body='user添加'
});
router.get('/delete',async (ctx)=>{
    ctx.body='user删除'
});
router.get('/editor',async (ctx)=>{
    ctx.body='user编辑'
});
module.exports = router.routes();
