import { useState } from 'react';
import { Button, CardActions } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { Note } from '../../../utils/types';
import { notesSlice } from '../../../redux/notes/slices';
import useAppDispatch from '../../../hooks/useAppDispatch';
import * as styled from './styled';

interface NoteProps {
  note: Note;
}

export const NoteItem = ({ note }: NoteProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState<string>(note.text);

  const { updateNote, deleteNote } = notesSlice.actions;
  const dispatch = useAppDispatch();

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(deleteNote(note));
  };

  const onTextClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const onSaveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(updateNote({ ...note, text: textareaValue }));
    setIsEdit(false);
  };

  return (
    <styled.Note>
      <CardActions>
        <styled.IdText>{note.id}</styled.IdText>
        <styled.DeleteButton onClick={onDeleteClick}>
          <Delete />
        </styled.DeleteButton>
      </CardActions>

      <styled.NoteContent>
        {isEdit ? (
          <styled.EditContainer>
            <styled.NoteTextarea
              value={textareaValue}
              maxRows={20}
              onChange={onTextareaChange}
              autoFocus
            />
            <Button variant="outlined" size="small" onClick={onSaveClick}>
              Save
            </Button>
          </styled.EditContainer>
        ) : (
          <styled.Text onClick={onTextClick}>{note.text}</styled.Text>
        )}
        <hr />
        <p>{note.tags}</p>
      </styled.NoteContent>
    </styled.Note>
  );
};
