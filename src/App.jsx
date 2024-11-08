import { useState } from 'react';
import './App.css';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
import uuid from 'react-uuid';
import { useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setActiveNote(notes.length ? notes[0].id : false);
  }, [notes, setActiveNote]);

  const addNote = () => {
    const newNote = {
      id: uuid(),
      title: '新規ノート',
      content: '',
      modDate: Date.now()
    };

    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const updateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    })

    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        addNote={addNote}
        deleteNote={deleteNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} updateNote={updateNote} />
    </div>
  )
}

export default App