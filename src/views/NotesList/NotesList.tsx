import { useEffect } from 'react';

import { notesSlice } from '../../redux/notes/slices';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { Note } from '../../utils/types';
import { NoteItem } from './Note/Note';
import * as styled from './styled';

const breakpointColumnsObj = {
  default: 3,
};

interface NoteListProps {
  notes?: Note[];
}

export const NotesList = ({ notes }: NoteListProps) => {
  const { filteredNotes } = useTypedSelector((state) => state.notes);
  const { updateFilteredNotes } = notesSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateFilteredNotes(notes || []));
  }, [notes]);

  return (
    <styled.Main>
      <styled.MainContainer>
        <styled.MainMasonry
          breakpointCols={breakpointColumnsObj}
          className="notes-list__masonry"
          columnClassName="notes-list__masonry"
        >
          {filteredNotes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </styled.MainMasonry>
      </styled.MainContainer>
    </styled.Main>
  );
};
