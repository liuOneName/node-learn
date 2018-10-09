const Koa = require('koa');
const views = require('koa-views');
const Router = require('koa-router');
const path = require('path');

const app = new Koa();
const routers = new Router();




//加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs',
}))

routers.get('/', async ctx => {
    let title = 'hello koa2';
    await ctx.render('index', {
        title,
    })
})
.get('/test', async ctx => {
    let title = 'test';
    let h2 = 'Hello World';
    let h3 = '爱你哟';
    await ctx.render('test', {
        title,
        h2,
        h3
    }) 
})

// app.use(async ctx => {
//     console.log(1);
//     let title = 'hello koa2';
//     await ctx.render('index', {
//         title,
//     })
// })

// app.use(async ctx => {
//     console.log(2);
//     let title = 'test';
//     let h2 = 'Hello World';
//     let h3 = '爱你哟';
//     await ctx.render('test', {
//         title,
//         h2,
//         h3
//     })
// })

app.use(routers.routes())
    .use(routers.allowedMethods());

app.listen(3000, () => {
    console.log(`run ports 3000`);
})