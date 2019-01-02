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
db.addCategory.insert({
    "title":"用koa2当后台",
    "description":"使用koa2当后台，给前端提供接口",
    "keywords":"koa2,后台",
    "pid":"0",
    "add_time":123456789
})


