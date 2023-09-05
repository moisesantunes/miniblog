const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose= require("mongoose");

// configurando mongoose
mongoose.connect('mongodb://0.0.0.0:27017/blogDB', {useNewUrlParser:true});
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("funfou")
});*/

//configurando static 
app.use(express.static('public'))

//configurando ejs
app.set('view engine', 'ejs');

//configurando body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//definindo modelos
const PostagemModel = new mongoose.Schema({
	titulo: String,
	corpo: String,
	data_post: String
})

const Postagem = mongoose.model("Postagem", PostagemModel)


app.get("/", (req, res) =>{
	res.render('index')

});

app.get("/novo_post", (req, res) =>{
	res.render('novo_post')

});
app.post("/novo", (req, res) =>{
	Postagem.create(req.body, (err, resultado) =>{
		if(err) console.log("deu ruim", err)
		console.log(resultado)
		res.redirect("/novo_post")
	})
});


app.get("/posts_salvos", (req, res) =>{
	Postagem.find({} , (err, posts) =>{
		if(err) console.log("deu ruim na pesquisa dos posts", err)
		console.log(posts)
	})
})


app.get("/posts_page/:page?", (req, res) =>{
let page="";
let num="";
if(!req.params.page){
page = 0;
 num = page * 5;
	
}
if(req.params.page){
	page = Number(req.params.page);	

	if(isNaN(page)){
		console.log("é nanano")	
		res.redirect("/")
	}else{
		num = page * 5;
	}
}

	console.log("--------")
	
	console.log(num)
	
	console.log("--------")

/*	
	Postagem.find({} , null, {skip: num , limit: 5},(err, posts) =>{
		if(err) console.log("deu ruim na pesquisa dos posts", err)
		console.log("--------")
		
		console.log(posts)
		console.log("--------")
		
		res.redirect("/")
		
	}) 
	*/
})

app.listen(3000, ()=>{
	console.log('ta rodando versao 2023')

})