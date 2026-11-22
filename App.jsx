
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const inputRef = useRef(null);

  // Save notes in localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add or update note
  const addNote = () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      setNotes(notes.map(note =>
        note.id === editId
          ? { ...note, text: input }
          : note
      ));

      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        text: input
      };

      setNotes([...notes, newNote]);
    }

    setInput("");
    inputRef.current.focus();
  };

  // Edit note
  const editNote = (note) => {
    setInput(note.text);
    setEditId(note.id);
    inputRef.current.focus();
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app">
      <div className="container">

        <h1>📝 My Notes</h1>
        <p className="subtitle">
          Write down your thoughts and ideas!
        </p>

        <div className="input-area">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your note here..."
            rows="4"
          />

          <button onClick={addNote}>
            {editId !== null ? "Update Note" : "Add Note"}
          </button>
        </div>

        <h2>My Notes ({notes.length})</h2>

        <div className="notes-list">
          {notes.length === 0 ? (
            <p className="empty">
              No notes yet. Add your first note!
            </p>
          ) : (
            notes.map(note => (
              <div className="note-card" key={note.id}>
                <p>{note.text}</p>

                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => editNote(note)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
