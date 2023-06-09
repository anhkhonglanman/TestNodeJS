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

function getUrl(req){
    const urlParse = url.parse(req.url,true)
    const pathName = urlParse.pathname

    return pathName.split('/')
}



const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname;
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
        const filesDefences = urlPath.match(/\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot|\.jpeg/);
        if(filesDefences){
            const extension = typeFile[filesDefences[0].toString().split('.')[1]];
            res.writeHead(200,{'Content-Type': extension});
            fs.createReadStream(__dirname + req.url).pipe(res)
        }else {
            const arrPath = getUrl(req);
            let trimPath = '';
            if (arrPath.length > 2) {
                trimPath = arrPath[1] + '/' + arrPath[2];
            } else {
                trimPath = arrPath[arrPath.length - 1];
            }
            let chosenHandler;
            if (typeof router[trimPath] === 'undefined') {
                // chosenHandler = notFoundRouting.showNotFound;
                res.end();
            } else {
                chosenHandler = router[trimPath];

                chosenHandler(req, res, arrPath[3]);
            }

        }
    }

})

server.listen(8080, ()=> {
    console.log(`Server is running!`);
})