import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/notesSlice';

const AddNoteForm = () => {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim() !== '') {
      dispatch(addNote({
        text: noteText,
        completed: false
      }));
      setNoteText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Enter note text"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
