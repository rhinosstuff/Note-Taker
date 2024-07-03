// uuid generates unique id's
const { v4: uuidv4 } = require('uuid')
const notes = require('express').Router()
const { parseNotes, appendNote, deleteNote } = require('../helpers/fsUtils')

// GET request to display notes from db.json
notes.get('/notes', async (req, res) => {
  console.info(`${req.method} request received for notes`)
  try {
    const parsedNotes = await parseNotes()
    res.json(parsedNotes)
  } catch (err) {
    res.status(500).json({ error: 'Error reading notes' })
  }
})

// POST request to append new note to db.json, checks to make sure title & text are valid
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
      await appendNote(newNote)
      res.status(201).json('Note added successfully');
    } catch (err) {
      res.status(500).json({ error: 'Error adding note' });
    }
  } else {
    res.status(400).json({ error: 'Error in adding note: Missing title or text' });
  }
})

// DELETE request to remove note from db.json based on id, checks to make sure id is valid
notes.delete('/notes/:id', async (req, res) => {
  console.info(`${req.method} request received to remove note`)
  console.log(req.params)

  const { id } = req.params

  if (id) {
    try {
      await deleteNote(id)
      res.status(200).json('Note removed successfully')
    } catch (err) {
      res.status(500).json({ error: 'Error removing note' })
    }
  } else {
    res.status(400).json({ error: 'No note found' })
  }
})

module.exports = notes