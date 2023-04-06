const fs = require('fs');
const qs=require('qs')

class BlogRouting {
    static showHome(req, res) {
        fs.readFile('./views/blog.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {


                res.writeHead('200', 'txt/html')
                res.write(createHtml)
                res.end()
            }
        })
    }
}

module.exports = BlogRouting