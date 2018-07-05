
//导入包
var http = require('http');
var exec = require('child_process').exec;
var querystring = require('querystring');
//建立server，与客户端通信
http.createServer(function(req,res){
    var body = "";   //待接收的数据
    req.on('data',function(chunk){
        body += chunk;    //将所有接收到的数据进行拼接
    });
    //发送数据给客户端
    req.on('end',function(){    
        body = querystring.parse(body);
        //响应头
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        var arg = body.key;
        //执行本服务器的python文件
        exec('python test.py '+ arg,function(error,stdout,stderr){
            if(stdout.length > 1){
                res.write(stdout);   //将python文件的输出发送给客户端
            }else{   //容错处理
                res.write('no res');
            }
            if(error){
                res.write('error!!!');
            }
            res.end();   //发送完毕
        })
    });
}).listen(80);   //监听80端口
