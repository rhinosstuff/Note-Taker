const fs = require('fs')
const util = require('util')
const notesArray = 'db/db.json'

// Promise version of fs.readFile & fs.wtireFile, to allow (async and await) 
const readFromFile = util.promisify(fs.readFile)
const writeToFile = util.promisify(fs.writeFile)

// Parses db.json for easy access from other functions
const parseNotes = async () => {
  const data = await readFromFile(notesArray, 'utf8')
  let parsedNotes = []
    
  if (data) {
    parsedNotes = JSON.parse(data) 
  }

  return parsedNotes
}

// Appends newNote to db.json  
const appendNote = async (newNote) => {
  try {
    const parsedNotes = await parseNotes()
    parsedNotes.push(newNote)
    await writeToFile(notesArray, JSON.stringify(parsedNotes, null, 4))
  } catch (err) {
    console.error(err)
  }
}

// Deletes note based on id from db.json
const deleteNote = async (id) => {
  try {
    const parsedNotes = await parseNotes()
    const filteredNotes = parsedNotes.filter((obj) => obj.id !== id)
    await writeToFile(notesArray, JSON.stringify(filteredNotes, null, 4))
  } catch (err) {
    console.error(err)
  }
}

module.exports = { readFromFile, writeToFile, parseNotes, appendNote, deleteNote }