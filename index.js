const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())

/* - query params => meusite.com/users?name=roberto&age=34 // FILTROS
   - Route params => users/2 // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
   - Request Bodt => { "name": "Roberto", age:}

   - Middleware => INTERCEPTADOR 

*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    
    }

    request.userIndex = index
    
    next()
}


app.get('/users', (request, response) => {

    console.log('A rota foi chamada')

    return response.json(users)
})


app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age } = request.body
    
    const updatedUser = { id, name, age }

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }

    users[index] = updatedUser
    
    
    return response.json(updatedUser)
})



app.listen(3000, () => {
    console.log('🚀 Server started on port 3000')
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }

    users.splice(index, 1)


    return response.status(204).json()
})
