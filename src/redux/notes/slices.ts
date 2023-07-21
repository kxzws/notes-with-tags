import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Note } from '../../utils/types';
import { NotesState } from './types';

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      const { payload } = action;

      state.notes.unshift(payload);
    },
    deleteNote(state, action: PayloadAction<Note>) {
      const { payload } = action;
      const copy = state.notes.slice();

      state.notes = copy.filter((note) => note.id !== payload.id);
    },
    updateNote(state, action: PayloadAction<Note>) {
      const { payload } = action;
      const copy = state.notes.slice();

      state.notes = copy.filter((note) => note.id !== payload.id);
      state.notes.unshift(payload);
    },
  },
  extraReducers: () => {},
});

export default notesSlice.reducer;
