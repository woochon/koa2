/*
* 多次链接问题和多次实例化问题
* */

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbConfig = require('./config');


class DB{
    static getInstatnce(){
        if(!DB.instance){
            DB.instance =  new DB();
        }
        return DB.instance;
    }
    constructor(){
        this.dbClient='';   // 属性  放db对象  解决多次链接问题
        this.connect();     // 实例化的时候链接数据库，速度更快
    }
    connect(){
        return new Promise((resolve,reject)=>{
            if(!this.dbClient){
                MongoClient.connect(dbConfig.dbUrl,{useNewUrlParser:true},(err,client)=> {
                    if (err) {
                        reject(err);
                    } else {
                        this.dbClient=client.db(dbConfig.dbName);
                        resolve(this.dbClient);
                    }
                })
            }else{
                resolve(this.dbClient);
            }
        })
    }
    insert(collectName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then(db=>{
            db.collection(collectName).insertOne(json,(err,res)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(res)
                    }
                })
            })
        })
    }
    find(collectName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then(db=>{
                let result = db.collection(collectName).find(json);
                result.toArray((err,docs)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(docs);
                    }
                })
            })
        })
    }
    /* json1要修改的数据，json2要改成的数据 */
    update(collectName,json1,json2){
        return new Promise((resolve,reject)=>{
            this.connect().then(db=>{
                db.collection(collectName).updateOne(json1,{$set:json2},(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        });
    }
    remove(collectName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then(db=>{
                db.collection(collectName).removeOne(json,(err,res)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(res);
                    }
                })
            })
        });
    }
    // @原封不动输出
    getObjectID(id){
        return new ObjectID(id);
    }
}

/* 测试多次链接的问题 */
/*const db1= new DB();
setTimeout(()=>{
    console.time('start1');
    db1.find('user',{}).then(res=>{
        //console.log(res);
        console.timeEnd('start1');
    });
},100);

setTimeout(()=>{
    console.time('start2');
    db1.find('user',{}).then(res=>{
        //console.log(res);
        console.timeEnd('start2');
    });
},3000);*/

/* 测试多次实例的问题 */
/*const db3= DB.getInstatnce();
setTimeout(()=>{
    console.time('start3');
    db3.find('user',{}).then(res=>{
        //console.log(res);
        console.timeEnd('start3');
    });
},5000);
const db4= DB.getInstatnce();
setTimeout(()=>{
    console.time('start4');
    db4.find('user',{}).then(res=>{
        //console.log(res);
        console.timeEnd('start4');
    });
},7000);*/

// const db5 = DB.getInstatnce();
//db5.insert('user',{"name":'zhaoliu4444',"age":100});
//db5.update("user",{"name":"zhangsan"},{"name":"zhangsan666","age":234});
//db5.remove("user",{"name":"zhaoliu4444"});

module.exports=DB.getInstatnce();



