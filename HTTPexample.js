const http = require('http')
var server = http.createServer(function(req,res){
    if(req.url=='/'){
        res.write("Hello world")
        res.end()
    }else if(req.url=='/dog'){
        var dog={
            name:"bruno",
            age:1
        }
        res.write(JSON.stringify(dog))
        res.end()
    }
    else{
        res.write("unknown endpoint")
        res.end()
    }
})
server.on('connection',()=>{console.log('client get connected!')})
server.listen(5000)