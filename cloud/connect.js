/*导???~E*/
var http = require('http');
var exec = require('child_process').exec;
var querystring = require('querystring');
/*建?Kserver?L?N客??端?~Z信*/
http.createServer(function(req,res){
    var body = "";   /*?E?????~D录°??*/
    req.on('data',function(chunk){
        body += chunk;    /*?F?~@?~I?????°?~D录°??达[*/
    });
Socket error Event: 32 Error: 10053.
Connection closing...Socket close.
        body = querystring.parse(body);
Connection closed by foreign host.
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
Disconnected from remote host(新建会话 (2)) at 00:56:37.
        /*?§?L???~M??余¨?~Dpython彖~G件*/
Type `help' to learn how to use Xshell prompt.ror,stdout,stderr){
[C:\~]$ 
                res.write(stdout);   /*?Fpython彖~G件?~D轾S??住~Q?~A纾Y客??端*/
            }else{   /*容?~Y?D?~F*/
                res.write('no res');
            }
            if(error){
                res.write('error!!!');
            }
            res.end();   /*住~Q?~A?L?U*/
        })
    });
}).listen(80);   /*?~Q佐?80端住?*/
