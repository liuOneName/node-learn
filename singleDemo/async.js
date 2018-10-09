async function a(){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve('Hello word');
        }, 3000)
    })
}

async function test(){
    console.log(await a());
    console.log('异步之后');
}
const result = test();
console.log(result);