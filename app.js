const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');
const DB =require('./mongoDB/index');
const jsonp = require('koa-jsonp');
const cors =require('koa2-cors');
const session = require('koa-session');
const app = new Koa();

app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
    ctx.state.DB=DB;
    await next();
});
app.use(jsonp());
app.use(cors());

const router = require('./router');
/*const router = require('./routers/index');*/
const middleware = require('./middleware');
middleware(app);

// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./public")));
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),// 指定视图目录
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防Xss
    }
}));

app.use(bodyParser());
router(app);
app.listen(3000, ()=>{
    console.log('server is running at http://localhost:3000')
});
