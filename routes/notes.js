const notes= require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
// notes.get('/', (req, res) => {
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
// });

// POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);
    
    const { title, text } = req.body;
    
        const newNote = {
        title,
        text,
        note_id: uuid(),
        };
    
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);

    });

// DELETE Route for a note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

module.exports = notes;