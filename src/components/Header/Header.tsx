import { Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

import { notesSlice } from '../../redux/notes/slices';
import useAppDispatch from '../../hooks/useAppDispatch';
import * as styled from './styled';

export const Header = () => {
  const { addNote } = notesSlice.actions;
  const dispatch = useAppDispatch();

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addNote({ id: uuidv4(), text: 'New note', tags: [] }));
  };

  return (
    <styled.Header>
      <styled.HeaderContainer>
        <styled.Heading>notes-with-tags</styled.Heading>
        <styled.AddButton
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={onAddClick}
        >
          Create new note
        </styled.AddButton>
        <p>Filter</p>
      </styled.HeaderContainer>
    </styled.Header>
  );
};
