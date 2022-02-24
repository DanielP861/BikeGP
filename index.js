const express = require('express')
const req = require('express/lib/request')
const app = express()
const authController = require('./controller/auth.controller')
const path = require('path')
                        
app.use(express.urlencoded({ extended: true}))
app.use(express.json({extended: false}))

// rota equipamento
app.use('/equipamento', require('./routes/equipamento.route'))

//rota utilizador
app.use('/utilizador', require('./routes/utilizador.route'))

//rota login
app.use('/login', require('./routes/login.route'))

app.use('/admin', require('./routes/admin.route'))

app.post('/page',authController.checkAuth,(req,res)=>{
  if(req.body.nivel==="admin")
       res.redirect('/clienteTB')
  else
       res.redirect('/dispositivo')
})

app.get('/clienteTB',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/clienteTB.html'))
})

app.get('/dispositivo',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/dispositivo.html'))
})

app.use(express.static('./public'));

app.get('/',  (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'))
})
const port= process.env.PORT || 3000

//define PORT
const PORT = 3000;

//set listen to PORT
app.listen(process.env.PORT || PORT, () => console.log('Listening on port ' + PORT));
