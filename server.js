const http = require('http')
const fs = require('fs')
const qs = require('qs')

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/todo.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./views/display.html', 'utf8', (err, datahtml) => {
                if (err) {
                    console.log(err);
                }
                datahtml = datahtml.replace('{todo1}', userInfo.todo1);
                datahtml = datahtml.replace('{todo2}', userInfo.todo2);
                datahtml = datahtml.replace('{todo3}', userInfo.todo3);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});