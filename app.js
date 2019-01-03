const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');
const DB =require('./mongoDB/index');
const jsonp = require('koa-jsonp');
const cors =require('koa2-cors');

const app = new Koa();

app.use(async (ctx, next) => {
    ctx.state.DB=DB;
    await next();
});
app.use(jsonp());
app.use(cors());

const router = require('./router');
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
