import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('notes')
    if(saved) setNotes(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if(text.trim() === '') return
    const newNote = {id: Date.now(), text, date: new Date().toLocaleDateString()}
    setNotes([newNote,...notes])
    setText('')
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id!== id))
  }

  const filteredNotes = notes.filter(n =>
    n.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="phone-frame">
      <h1>My Notes </h1>

      <input
        className="search"
        placeholder="Search notes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="add-note">
        <textarea
          placeholder="Write your note here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      <div className="notes-grid">
        {filteredNotes.length === 0? <p>No notes yet</p> :
          filteredNotes.map(note => (
            <div className="note-card" key={note.id}>
              <p>{note.text}</p>
              <small className="note-date">{note.date}</small>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App;