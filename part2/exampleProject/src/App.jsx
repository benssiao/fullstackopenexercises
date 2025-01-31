import { useState, useEffect } from 'react'
import axios from 'axios'
//import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  function addNote(event) {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    axios
    .post("http://localhost:3001/notes", noteObject)
    .then(response => {
      setNotes(note.concat(response.data));
      setNewNote("");
    })

  // ...
}

export default App;