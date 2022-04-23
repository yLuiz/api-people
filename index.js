//CONFIGURAÇÃO INICIAL
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

//LER JSON
app.use(
  express.urlencoded({
     extended: true
  })
)

app.use(express.json())

//ROTAS API
const personRoutes = require('./routes/person.routes')

app.use('/person', personRoutes)

//ROTA INICIAL / EndPoint
app.get('/', (request, response) => {
  response.json({
    message: 'Express!'
  })
})

/* 
  Link MongoDB
  Password: apirestfulnodejs001
  mongodb+srv://luizv:apirestfulnodejs001@apicloster.fo3dp.mongodb.net/bancodaapi?retryWrites=true&w=majority
*/

//ENTREGAR PORTA

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicloster.fo3dp.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {
  console.log('Conectado ao MongoDB!')
  app.listen(3000)
})
.catch(err => console.log(err))
