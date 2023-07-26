import { Note } from '../../utils/types';

export interface NotesState {
  filteredNotes: Note[];
  filterList: string[];
  selectedFilterValues: string[];
}
