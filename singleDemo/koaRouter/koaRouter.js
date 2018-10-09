const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

function reader(url){
    return new Promise((resolve, reject) => {
        let pageUrl = `./${url}`;
        fs.readFile(pageUrl, 'binary', (err, data) => {
            console.log('read');
            if(err){
                console.log('err');
                reject(err);
            } else {
                console.log('success', data);
                resolve(data);
            }
        })
    });
}

async function getPage(url){
    let page;
    switch(url) {
        case '/': page = 'index.html';
            break;
        case '/text': page = 'text.html';
            break;
        default: 
            break;
    }
    console.log(page);
    let html = await reader(page);
    return html;
}

app.use(async ctx => {
    let html = await getPage(ctx.request.url);
    console.log('html', html)
    ctx.body = html;
})


app.listen(3000, () => {
    console.log('run ports 3000');
})