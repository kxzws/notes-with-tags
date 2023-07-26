import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Note } from '../../utils/types';
import { NotesState } from './types';

const initialState: NotesState = {
  filteredNotes: [],
  filterList: [],
  selectedFilterValues: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSelectedFilterValues(state, action: PayloadAction<string[]>) {
      const { payload } = action;
      state.selectedFilterValues = payload;
    },
    updateFilteredNotes(state, action: PayloadAction<Note[]>) {
      const { payload } = action;

      state.filterList = payload.length
        ? Array.from(
            new Set(
              payload.reduce((acc, curr) => ({
                ...acc,
                tags: [...acc.tags, ...curr.tags],
              })).tags
            )
          )
        : [];
      state.selectedFilterValues = state.selectedFilterValues.filter((selectedFilter) =>
        state.filterList.includes(selectedFilter)
      );

      state.filteredNotes = payload.filter((note) =>
        state.selectedFilterValues.every((tag) => note.tags.includes(tag))
      );
    },
  },
  extraReducers: () => {},
});

export default notesSlice.reducer;
