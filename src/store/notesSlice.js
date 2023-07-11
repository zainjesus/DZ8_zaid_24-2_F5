import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotes =  createAsyncThunk(
    'notes/fetchPNotes',
    async () => {
      const resp = await axios.get('https://dummyjson.com/todos?limit=3&skip=10')
      return resp.data
    }
)

export const addNote = createAsyncThunk('notes/addNote', async (note) => {
    const response = await axios.post('https://dummyjson.com/todos', note, {
    headers: {
        'Content-Type': 'application/json'
    }
    });
    return response.data;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload.todos;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes.push(action.payload.todos);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default notesSlice.reducer;
