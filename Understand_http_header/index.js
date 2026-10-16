
async function run (){
const res= await fetch("http://192.168.1.17:4000/");
for await(let chunk of res.body){
    console.log(chunk);
    
}
}

run()