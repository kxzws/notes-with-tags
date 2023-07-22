import { useState } from 'react';
import { CardActions } from '@mui/material';
import { Delete } from '@mui/icons-material';
import parseHTML from 'html-react-parser';

import { Note } from '../../../utils/types';
import { notesSlice } from '../../../redux/notes/slices';
import useAppDispatch from '../../../hooks/useAppDispatch';
import * as styled from './styled';

interface NoteProps {
  note: Note;
}

export const NoteItem = ({ note }: NoteProps) => {
  const [textareaValue, setTextareaValue] = useState<string>(note.text);

  const { updateNote, deleteNote } = notesSlice.actions;
  const dispatch = useAppDispatch();

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(deleteNote(note));
  };

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const onTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    e.preventDefault();

    const tags = Array.from(
      new Set(textareaValue.split(' ').filter((word) => word[0] === '#' && word.length > 1))
    );
    dispatch(updateNote({ ...note, text: textareaValue, tags }));
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
        <styled.TextareaContainer>
          <styled.NoteTextarea
            value={textareaValue}
            onChange={onTextareaChange}
            onBlur={onTextareaBlur}
          />
          <styled.TextareaOutput>
            {parseHTML(
              textareaValue
                .split(' ')
                .map((word) => {
                  if (word[0] === '#') {
                    return `<span style="color: blue;">${word}</span>`;
                  }
                  return word;
                })
                .join(' ')
            )}
          </styled.TextareaOutput>
        </styled.TextareaContainer>

        <hr />

        <styled.TagContainer>
          {note.tags.map((tag, ind) => (
            <styled.Tag key={`${tag}-${ind + 1}`}>{tag}</styled.Tag>
          ))}
        </styled.TagContainer>
      </styled.NoteContent>
    </styled.Note>
  );
};
