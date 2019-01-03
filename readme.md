## 开启 mongodb 服务：
- 要管理数据库，必须先开启服务，开启服务使用 mongod --dbpath c:\mongodb

## 管理 mongodb 数据库
- mongo


## 常用命令
- 显示所有数据库：
show dbs
- 使用指定数据库：
use bdName
- 显示所有集合：
show collections
- 在某个集合中插入数据
db.collectionName.insert({
    "title":"用koa2当后台",
    "description":"使用koa2当后台，给前端提供接口",
    "keywords":"koa2,后台",
    "pid":"0",
    "add_time":123456789
})
db.article.insert({
    "title":"filder",
    "description":"使用filder来抓取请求",
    "keywords":"测试,filder",
    "pid":"5c2e0beca80cdf129274cd83",
    "add_time":12244619
})
ObjectId("5c2e0beca80cdf129274cd83")

## Cannot find module 'is-generator-function'
- 文件路径引用出错或者require写错
- 然后是项目没有任何问题，需要重新安装 npm install

## 把koa2当做接口为前端提供数据，并允许跨域
- 返回json数据
```
npm install koa-jsonp -save
const jsonp = require('koa-jsonp');
app.use(jsonp());
```
- 允许跨域‘
```
npm install koa-cors -save
const jsonp = require('koa-cors');
app.use(cors());
```

### data[k].pid===firstCategory[j]._id
- 这两个值一样，数据类型也一样；但是不会全等，不知道为什么
```
console.log(data[1].pid);
console.log(typeof(data[1].pid));
console.log(data[j].pid);
console.log(typeof(data[j].pid));
console.log(data[1].pid===firstCategory[j]._id)
```
