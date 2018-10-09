const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

//简单的koa-router使用
// const router = new Router();
// router.get('/', ctx => {
//     ctx.body = 'get request';
// })
// .get('/test', ctx => {
//     ctx.body = 'get test';
// });
// app.use(router.routes())
//     .use(router.allowedMethods());


//复杂一点的应用
    //home
let home = new Router();
home.get('/', async ctx => {
    ctx.body = 'home page';
})
.get('/test2', async ctx => {
    ctx.body = 'home-test2 page';
});
    //index
let index = new Router();
index.get('/', async ctx => {
    ctx.body = 'indnx page';
})
.get('/test2', async ctx => {
    ctx.body = `index-test2 page; query ${ctx.querystring}`;
});

//整合 routes
let router = new Router();
router.use('/home', home.routes(), home.allowedMethods());
router.use('/index', index.routes(), index.allowedMethods());

//加载路由
app.use(router.routes())
.use(router.allowedMethods());








app.listen(3000, () => {
    console.log('run ports 3000')
})