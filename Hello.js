export default function  Hello(app){
console.log("Hello, World!");

function sayHello(req, res) {
    res.send("Life is good");
}

function rootResponse(req, res){
    res.send("Welcome to node.js server")
}


app.get("/hello", sayHello);
app.get("/", rootResponse);

}