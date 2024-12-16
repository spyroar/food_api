const express = require('express')
const app = express()
const PORT = 8080

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))


app.listen(PORT, () => console.log(`Port listening on ${PORT}!`))