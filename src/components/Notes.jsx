import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddNoteForm from './AddNoteForm';
import { fetchNotes } from '../store/notesSlice';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const status = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <AddNoteForm />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
