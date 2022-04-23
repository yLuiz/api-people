const router = require('express').Router()
const { response } = require('express')
const Person = require('../models/Person.model')

router.post('/', async (request, response) => {
  const { name, salary, approved } = request.body

  if(!name) {
    return response.status(422).json({error: 'Os dados nome, salário e aprovado são obrigatórios!'})
  }

  const person = {
    name,
    salary,
    approved
  }

  try{
    await Person.create(person)
    response.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
  }
  catch(err) {
    response.status(500).json({error: err})
  }
})

//-------- READ - LER DADOS --------

router.get('/', async(request, response) => {
  try{
   const people = await Person.find()

   response.status(200).json(people)
  }
  catch(err) {
    response.status(500).json({error: err})
  }
})

router.get('/:id', async (request, response) => {
  //EXTRAIR O DADO, PELA URL -> request.params
  const id = request.params.id

  try {

    const person = await Person.findOne({_id: id})
    
    if(!person) {
      return response.status(404).json({message: 'Usuário não encontrado!'})
    }

    response.status(200).json(person)
  }
  catch(err) {
    response.status(500).json({error: err})
  }
})

//-------- UPDATE - ATUALIZAR DADOS (PUT, PATCH) --------

router.patch('/:id', async (request, response) => {
  const id = request.params.id
  const { name, salary, approved } = request.body

  const person = {
    name,
    salary,
    approved
  }

  try {

    const updatedPerson = await Person.updateOne({_id: id}, person)

    if(updatedPerson.matchedCount === 0) {
      return response.status(404).json({message: 'Usuário não encontrado!'})
    }

    response.status(200).json(person)
  }
  catch(err) {
    response.status(500).json({error: err})
  }

})

//-------- DELETE - DELETAR DADOS (PUT, PATCH) --------

router.delete('/:id', async (request, response) => {
  const id = request.params.id

  const person = await Person.findOne({_id: id})

  if(!person) {
    return response.status(404).json({message: "Usuário não encontrado!"})
  }

  try {

    await Person.deleteOne({_id: id})
    response.status(200).json({message: "Usuário removido com sucesso!"})

  }

  catch(err) {
    response.status(500).json({error: err})
  }

})

module.exports = router
