const notes = require('express').Router()
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils')
// Generates unique id's
const { v4: uuidv4 } = require('uuid')

// Request to read notes from db.json
notes.get('/notes', (req, res) => {
  console.info(`${req.method} request received for notes`)
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

// Request to write new note to db.json
notes.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add notes`)
  console.log(req.body)

  const { title, text } = req.body

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    }

    readAndAppend(newNote, './db/db.json')
    res.status(201).json('Note added successfully')
  } else {
    res.status(400).json({ error: 'Error in adding note: Missing title or text' })
  }
})

// Delete request to delete a note
notes.delete('/notes/:id', (req, res) => {
  console.info(`${req.method} request received to remove note`)
  console.log(req.params)

  const { id } = req.params

  if (id) {
    readAndDelete(id, './db/db.json')
    res.status(200).json('Note removed successfully')
  } else {
    res.status(400).json({ error: 'No note found' })
  }
})

module.exports = notes