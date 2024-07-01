const express = require('express')
const path = require('path')
const api = require('./routes/notes.js')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware for parsing JSON and urlencoded form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api', api)

// Static files
app.use(express.static('public'))

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
)
