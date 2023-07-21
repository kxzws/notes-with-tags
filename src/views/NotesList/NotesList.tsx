import useTypedSelector from '../../hooks/useTypedSelector';
import { NoteItem } from './Note/Note';
import * as styled from './styled';

const breakpointColumnsObj = {
  default: 3,
};

export const NotesList = () => {
  const { notes } = useTypedSelector((state) => state.notes);

  return (
    <styled.Main>
      <styled.MainContainer>
        <styled.MainMasonry
          breakpointCols={breakpointColumnsObj}
          className="notes-list__masonry"
          columnClassName="notes-list__masonry"
        >
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </styled.MainMasonry>
      </styled.MainContainer>
    </styled.Main>
  );
};
