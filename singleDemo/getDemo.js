const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    console.log(ctx);
    let url = ctx.url;
    //从request中接收get请求
    let req = ctx.request;
    let req_query = req.query;
    let req_querystring = req.querystring;
    //从上下文中获取 get请求
    let ctx_query = ctx.query;
    let ctx_querysting = ctx.querystring;
    ctx.body = { // 好像是 接口返回的 数据
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querysting
    }
})

app.listen(3000, () => {
    console.log('server run 3000 port');
})