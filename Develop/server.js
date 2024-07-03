const express = require('express')
const path = require('path')
const api = require('./routes/notes')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware for parsing JSON and urlencoded form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files
app.use(express.static('public'))

// API routes
app.use('/api', api)

// GET Route to display notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// GET Route to display main homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
)
