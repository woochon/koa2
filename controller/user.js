/*const userService = require('../service/user');*/
/*const DB =require('../mongoDB/index');*/
/*
* 引入svgCaptcha
* */
const DB =require('../mongoDB/index');
const svgCaptcha = require('svg-captcha');
module.exports={
    index:async (ctx,next)=>{
        // console.log(ctx);
        // console.log('====');
        /*const res=await DB.find('user',{});
        console.log(res);*/
        // await ctx.render('user/index',{title:'欢迎来到'});
        let res='';
        res=await ctx.state.DB.find('user',{});
        /*console.log(res);*/
        await ctx.render('user/index',{title:'欢迎来到',msgList:res});
    },
    add:async (ctx,next)=>{
        // ctx.response.body='添加学员信息';
        await ctx.render('user/add');
    },
    doAdd:async (ctx,next)=>{
        //console.log(ctx.request.body);
        let {name,age} = ctx.request.body;
        res=await ctx.state.DB.insert('user',{name,age});
        //console.log(res);
        //ctx.response.body='执行添加学员信息';
        //let data = await UserService.doAdd(name, password);
        //console.log();
        //console.log(res.result.ok);
        if(res.result.ok){
            // ctx.response.body='添加学员信息成功';
            // await ctx.render('user/index',{title:'欢迎来到',msgList:res});
            ctx.response.redirect('/');
        }
    },
    editor:async (ctx,next)=>{
        // ctx.response.body='修改添加学员信息';
        let id = ctx.query.id;
        // console.log(id);
        let data = await ctx.state.DB.find('user',{"_id":ctx.state.DB.getObjectID(id)});
        // console.log(data);
        await ctx.render('user/editor',{data:data[0]});
    },
    doEditor:async (ctx,next)=>{
        //ctx.response.body='执行修改学员信息';
        // console.log(ctx.request.body);
        let tmp=ctx.request.body;
        // 第一种方法修改不成功
        // let data = await ctx.state.DB.update('user',tmp.userId)},{"name":tmp.name,"age":tmp.age});
        let data = await ctx.state.DB.update('user',{"_id":ctx.state.DB.getObjectID(tmp.userId)},{"name":tmp.name,"age":tmp.age});
        //console.log(ctx.query);
        // console.log(data);
        if(data.result.ok){
            ctx.response.redirect('/');
        }
    },
    remove:async (ctx,next)=>{
        // ctx.response.body='删除添加学员信息';
        let id = ctx.query.id;
        let data = await ctx.state.DB.remove('user',{"_id":ctx.state.DB.getObjectID(id)});
        if(data.result.ok){
            ctx.response.redirect('/');
        }
    },
    json:async (ctx,next)=>{
        ctx.send({"name":"zhansgan","age":40});
    },


    login:async (ctx,next)=>{
        const params = ctx.request.body;
        const email=params.userName;
        const password = params.password;
        const res=await DB.find('admin',{"email":email,"password":password});
        if(res.length>0){
            ctx.body={"code":0,"message":"登录成功","data":{"_id":res._id}};
        }else{
            ctx.body={"code":1,"message":"账号或密码错误"};
        }
    },
    userInfo:async (ctx)=>{
        console.log(ctx.body);

    },
    getIdentityCode:async (ctx,next)=>{
        let captcha = svgCaptcha.create({
            size:4,
            fontSize:24,
            width:100,
            height:24,
            background:'#cc9966'
        });
        /*ctx.response.type='image/svg+xml';*/
        /*ctx.body = captcha.data*/
        ctx.body = {
            "code":0,"data":captcha.data,"text":captcha.text
        }
    }

};
