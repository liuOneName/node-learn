const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    if(ctx.url === '/' && ctx.method === 'GET'){
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
    } else if(ctx.url === '/' && ctx.method === 'POST'){
        let data = await handleData(ctx);
        let result = toObj(data);
        ctx.body = result;
    } else {
        ctx.body = `<h3>页面走失</h3>`;
    }
})

//处理接收的参数
function handleData(ctx){
    console.log(ctx);
    return new Promise((resolve, reject) => {
        try{
            let formData = '';
            ctx.req.on('data', data => {
                formData += data;
                console.log(data);
            });
            ctx.req.addListener('end', () => {
                resolve(formData)
            })
        } catch(err){
            reject(err);
        }
    })
}
//将a=b&c=d这样的formData 转换成对象
function toObj(data){
    console.log(data);
    let result = {};
    let arr = data.split('&');
    for(let [k, v] of arr.entries()){
        let arr1 = v.split('=');
        result[arr1[0]] = decodeURIComponent(arr1[1]);
    }
    return result;
}

app.listen(3000, ()=>{
    console.log('serve run port 3000')
})