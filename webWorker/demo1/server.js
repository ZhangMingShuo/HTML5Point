
let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')

http.createServer((req, res)=>{
  let pathname = url.parse(req.url).pathname
  let realPath = path.join(__dirname, pathname)
  fs.readFile(realPath, (err, data)=>{
    if(err){
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('404页面不存在')
      res.end()
    }else {
      res.writeHead(200, {'Content-Type': 'text/html;chartset=UTF-8'})
      res.write(data)
      res.end()
    }
  })
}).listen(81, '127.0.0.1')

console.log('server running at http://127.0.0.1:81')