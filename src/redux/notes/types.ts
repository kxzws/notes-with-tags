import { Note } from '../../utils/types';

export interface NotesState {
  notes: Note[];
  filteredNotes: Note[];
  filterList: string[];
  selectedFilterValues: string[];
}
