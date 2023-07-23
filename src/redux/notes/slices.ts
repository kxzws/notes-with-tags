import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Note } from '../../utils/types';
import { NotesState } from './types';

const initialState: NotesState = {
  notes: [],
  filteredNotes: [],
  filterList: [],
  selectedFilterValues: [],
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
    setSelectedFilterValues(state, action: PayloadAction<string[]>) {
      const { payload } = action;

      state.selectedFilterValues = payload;

      state.filteredNotes = state.notes.filter((note) =>
        state.selectedFilterValues.every((tag) => note.tags.includes(tag))
      );
    },
    updateFilteredNotes(state) {
      state.filterList = Array.from(
        new Set(
          state.notes.reduce((acc, curr) => ({
            ...acc,
            tags: [...acc.tags, ...curr.tags],
          })).tags
        )
      );
      state.selectedFilterValues = state.selectedFilterValues.filter((selectedFilter) =>
        state.filterList.includes(selectedFilter)
      );

      state.filteredNotes = state.notes.filter((note) =>
        state.selectedFilterValues.every((tag) => note.tags.includes(tag))
      );
    },
  },
  extraReducers: () => {},
});

export default notesSlice.reducer;
