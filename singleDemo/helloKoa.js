const Koa = require('koa');
const app = new Koa();

//res
app.use( async (ctx, next) => {
    if(ctx.url === '/favicon.ico') return;
    console.log('1', ctx.method, ctx.url);
    const start = new Date();
    const result = await next(); // 执行接下来的 app.use() 方法
    const ms = new Date - start;
    console.log(result + 'result');
    ctx.body = `Hello Koa ${ms} ${start.getTime()}`;
});

app.use(async (ctx, next) => { //这个app.use() 应该是上面 next() 传下来的 ctx
    console.log('2-1', ctx.url, ctx.method);
    return new Promise((resolve, reject) => {
        resolve('2-2');
    })
})

app.listen(3000, () => {
    console.log('server run in 3000')
});