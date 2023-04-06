const http = require('http');
const url = require('url');
const fs = require('fs');
const handler = require('./controller/router');
const NotFoundRouting = require('./controller/handle/errorController');
const typeFile = {
    'jpg': 'images/jpg',
    'png': 'images/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/tff',
    'woff': 'font/woff',
    'woff2': 'font/woff',
    'eot': 'application/vnd.ms-fontobject'
}

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    if (pathName === '/assets/css/style.css') {
        fs.readFile('./views/assets/style.css', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
        return;
    } else {

    }

})

server.listen(8080, ()=> {
    console.log(`Server is running!`);
})