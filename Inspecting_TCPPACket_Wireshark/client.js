
async function run(){
const res=await fetch('http://192.168.1.17:4100/');

for await(let chuck of res.body)
{
    console.log(chuck);
    
}
}

run();