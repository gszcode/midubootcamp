import { useState, useEffect } from "react";
import { Note } from "./Note";
import { getAllNotes } from "./services/notes/getAllNotes";
import { createNote } from "./services/notes/createNote";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    getAllNotes().then((notes) => setNotes(notes));
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1,
    };

    createNote(noteToAddToState).then((newNote) => {
      setNotes([...notes, newNote]);
    });

    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>

      <ol>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear Nota</button>
      </form>
    </div>
  );
};

export default App;
