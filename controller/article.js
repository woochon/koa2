/*
* 文章分类管理
* */
/*const userService = require('../service/user');*/
/*const DB =require('../mongoDB/index');*/
module.exports={
    getCategoryList:async (ctx,next)=>{
        let data = await ctx.state.DB.find('article',{});
        /*console.log(data);*/
        let len=data.length;
        let firstCategory=[];
        for(let i=0;i<len;i++){
            if(data[i].pid==='0'){
                firstCategory.push(data[i]);
            }
        }
        console.log('++++++++++++++==');
        console.log(firstCategory);
        let len_first = firstCategory.length;
        for(let j=0;j<len_first;j++){
            firstCategory[j].list = [];
            /*for(let k =0;k<len;k++){
                if(data[k].pid===firstCategory[j].pid){
                    firstCategory[j].list.push(data[k])
                }
            }*/
            for(let k =0;k<len;k++){
                if(k===1){
                    console.log(data[1].pid);
                    console.log(typeof(data[1].pid));
                    console.log(data[j].pid);
                    console.log(typeof(data[j].pid));
                    console.log(data[1].pid===firstCategory[j]._id)
                }
                if(data[k].pid==firstCategory[j]._id){
                    firstCategory[j].list.push(data[k])
                }
            }
        }
        console.log('=======');
        console.log(firstCategory);
        /*ctx.send({"name":"zhansgan","age":40});*/
        /*ctx.body='asd';*/
        ctx.body={
            "name":"zhansgan","data":firstCategory
        }
    }
};
