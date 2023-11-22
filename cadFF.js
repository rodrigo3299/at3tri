//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/cadFF',
{   
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});




const UsuarioSchema = new mongoose.Schema({
    nome : {type : String},
    senha : {type : String},
    email : {type : String, required : true},
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//configurando os roteamentos
app.post("/cadastrousuario", async(req, res)=>{
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;


const usuario = new Usuario({
        nome : nome,
        senha : senha,
        email : email
    
    })

    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
       }

});

const ProdutotechSchema = new mongoose.Schema({
codigo: {type : String},
descricao : {type : String},
fornecedor : {type : String},
data_fabricacao : {type : Date, required : true},
quantidade_estoque : {type : Number},
});

const Produtotech = mongoose.model("Produtotech", ProdutotechSchema);

//configurando os roteamentos
app.post("/cadastroprodutotech", async(req, res)=>{
    const codigo = req.body.codigo;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const data_fabricacao = req.body.data_fabricacao;
    const quantidade_estoque = req.body.quantidade_estoque;
    

const produtotech = new Produtotech({
        codigo : codigo,
        descricao : descricao,
        marca : fornecedor,
        data_fabricacao : data_fabricacao,
        quantidade_estoque : quantidade_estoque
    
    })
    if(quantidade_estoque> 12){
        return res.status(400).json({error : "Acabou o estoque, não é possivel cadastrar mais!"});
    }
    else if(quantidade_estoque <= 0){
        return res.status(400).json({error : "Você digitou um valor de estoque inválido. Insira um valor de estoque entre 1 e 34. "});
    }

    try{
        const newProdutotech = await produtotech.save();
        res.json({error : null, msg : "Cadastro ok", ProdutotechId : newProdutotech._id});
    } catch(error){
       }
     
});
app.get("/cadastrousuario", async (req, res) => {
    res.sendFile(__dirname + "/cadastrousuario.html");
  });

  app.get("/cadastroprodutotech", async (req, res) => {
    res.sendFile(__dirname + "/cadastroprodutotech.html");
  });


app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})