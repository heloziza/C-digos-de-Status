var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.get("/processar_dados", function(req, res){
    res.end("Bem-vindo: " + req.query.nome + "; Idade: " + req.query.idade);
})

//post é usado quando vamos criar ou modificar um recurso por isso não podem ser expostas no link como acontece no GET
app.post("/processar_dados", urlencodedParser, function(req, res){
    response = {
        nome: req.body.nome,
        idade: req.body.idade
    };
    res.end(JSON.stringify(response));
})

app.get("/401", function(req, res) {
    res.status(401);
    res.render('401', { url: req.url });
});

app.get("/403", function(req, res) {
    res.status(403);
    res.render('403', { url: req.url });
});

app.get("/500", function(req, res) {
    res.status(500);
    res.render('500', { url: req.url });
});

app.use(function(req, res, next){
    res.status(404);
    res.render('404', {url: req.url});
})

app.listen(3000, () => {
    console.log("Funcionando");
});