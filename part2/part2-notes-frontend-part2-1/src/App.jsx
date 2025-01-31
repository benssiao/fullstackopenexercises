import Note from './components/Note'

const App = ({ notes }) => {
  function addNote(event) {
    event.preventDefault();
    console.log("I'm clicked");
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <button type="submit">Click me!</button>
      </form>
    </div>
  )
}

export default App