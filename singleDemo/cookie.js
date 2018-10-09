const Koa = require('koa');
const cors = require('koa2-cors');

const app = new Koa();

/**
 * domain：写入cookie所在的域名
path：写入cookie所在的路径
maxAge：Cookie最大有效时长
expires：cookie失效时间
httpOnly:是否只用http请求中获得
overwirte：是否允许重写
 */

app.use(cors({
    origin: "*",
    // function (ctx) {
    //     if (ctx.url === '/test') {
    //         return "*"; // 允许来自所有域名请求
    //     }
    //     return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    // },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    'Access-Control-Allow-Credentials': true,
}))

app.use(async ctx => {
    if(ctx.url === '/favicon.ico') return;
    // ctx.set("Access-Control-Allow-Origin", "*");
    if(ctx.url === '/index'){
        ctx.cookies.set(
            'age', '22',
            {
                domain: '127.0.0.1:3000',
                path: '/index',
                maxAge: 1000*60*60*24,
                expires: new Date('2018-09-07'),
                httpOnly: true,
                overwrite: true,
            }
        );
        console.log(ctx.cookies.get('age'));
        ctx.body = 'cookie is ok.'
    } else {
        if(ctx.cookies.get('age')){
            console.log(ctx.cookies.get('age'));
            ctx.body = ctx.cookies.get('age');
        } else {
            ctx.body = 'welcome here.'
            console.log(ctx.cookies.get('age'));
        }
    }
})






app.listen(3000, () => {
    console.log(`run ports 3000`);
})