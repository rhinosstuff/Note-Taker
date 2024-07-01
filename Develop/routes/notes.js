const notes = require('express').Router()
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils')
// Generates unique id's
const { v4: uuidv4 } = require('uuid')

// Request to read notes from db.json
notes.get('/notes', async (req, res) => {
  console.info(`${req.method} request received for notes`)
  try {
    const data = await readFromFile('db/db.json')
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Error reading notes' })
  }
})

// Request to write new note to db.json
notes.post('/notes', async (req, res) => {
  console.info(`${req.method} request received to add notes`)
  console.log(req.body)

  const { title, text } = req.body

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    }

    try {
      await readAndAppend(newNote);
      res.status(201).json('Note added successfully');
    } catch (err) {
      res.status(500).json({ error: 'Error adding note' });
    }
  } else {
    res.status(400).json({ error: 'Error in adding note: Missing title or text' });
  }
})

// Delete request to delete a note
notes.delete('/notes/:id', async (req, res) => {
  console.info(`${req.method} request received to remove note`)
  console.log(req.params)

  const { id } = req.params

  if (id) {
    try {
      await readAndDelete(id);
      res.status(200).json('Note removed successfully')
    } catch (err) {
      res.status(500).json({ error: 'Error removing note' })
    }
  } else {
    res.status(400).json({ error: 'No note found' })
  }
})

module.exports = notes