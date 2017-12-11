
let express=require('express');
let fs=require('fs');

let app=express();

//跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");//允许8080端口访问
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");//允许接收的头
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//允许的方法
    res.header('Access-Control-Allow-Credentials','true');//允许跨域设置cookie
    //res.header("X-Powered-By",' 3.2.1');
    //如果发的是options请求，响应ok即可
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});



//HOME轮播图
let sliders=require('./mock/slider');
app.get('/slider',function(req,res){
    res.json(sliders);
});

//HOME页面
let hots=require('./mock/hots');
app.get('/hot',function(req,res){
    res.json(hots);
});


//HOME详情页
app.get('/hotsongs/:hotId',function (req,res) {
    fs.readFile('./mock/file.json','utf8',function (err,data) {
        if(err) return console.log(err);
        let hotId=req.params.hotId;
        let hotsongs=[];
        data=JSON.parse(data);
        data.forEach((item,index)=>{
            if(item.hotId){
                if(item.hotId==hotId){
                    hotsongs.push(item);
                }
            }

        });
        res.send(JSON.stringify(hotsongs));
    });
});



//rank排行榜
app.get('/rank',function (req,res) {
    fs.readFile('./mock/file.json','utf8',function (err,data) {
        if(err) return console.log(err);
        res.send(JSON.parse(data));
    });
});

//获取排行榜具体歌曲
app.get('/rank/:type-name',function(req,res){
    fs.readFile('./mock/file.json','uft8',function(err,data){
        if(err) return console.log(err);
        let rank=[];
        let ranks=req.params.type-name;
        data=JSON.parse(data);
        rank=data.filter(item=>item["type-name"]==ranks).sort((a,b)=>b["heat"]-a["heat"]);
        res.send(JSON.stringify(rank));
    });
});


//搜索
app.get("/search",function (req,res) {
    fs.readFile("./mock/file.json","utf-8",function (err,data) {
        res.send(JSON.parse(data));
    });

});


app.listen(3000);