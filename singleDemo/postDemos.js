const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());
app.use(async ctx => {
    if(ctx.method === 'GET' && ctx.url === '/'){
        let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /> <br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    } else if(ctx.method === 'POST' && ctx.url === '/'){
        ctx.body = ctx.request.body; //直接用这种方式 获取 post 请求的参数对象 当然 用了 人家的轮子
    }
})


app.listen(3000, () => {
    console.log(`run ports 3000`);
})