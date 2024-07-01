const fs = require('fs')
const util = require('util')
const notes = 'db/db.json'

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile)
const writeToFile = util.promisify(fs.writeFile)

const readAndAppend = async (content) => {
  try {
    const data = await readFromFile(notes, 'utf8')
    const parsedData = JSON.parse(data)
    parsedData.push(content)
    await writeToFile(notes, JSON.stringify(parsedData, null, 4))
  } catch (err) {
    console.error(err)
  }
}

const readAndDelete = async (id) => {
  try {
    const data = await readFromFile(notes, 'utf8')
    const parsedData = JSON.parse(data)
    const filteredData = parsedData.filter((obj) => obj.id !== id)
    await writeToFile(notes, JSON.stringify(filteredData, null, 4))
  } catch (err) {
    console.error(err)
  }
}

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete }