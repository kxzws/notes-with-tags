import { useEffect, useRef, useState } from 'react';
import { CardActions } from '@mui/material';
import { Delete } from '@mui/icons-material';
import parseHTML from 'html-react-parser';

import { db } from '../../../db';
import { Note } from '../../../utils/types';
import * as styled from './styled';

interface NoteProps {
  note: Note;
}

export const NoteItem = ({ note }: NoteProps) => {
  const [titleInputValue, setTitleInputValue] = useState<string>(note.title);
  const [textareaValue, setTextareaValue] = useState<string>(note.text);

  const inputTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const textAreaTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (inputTimeoutRef.current) clearTimeout(inputTimeoutRef.current);
    if (note.title !== titleInputValue) {
      inputTimeoutRef.current = setTimeout(() => {
        db.notes.put({ ...note, title: titleInputValue });
      }, 700);
    }
  }, [titleInputValue]);

  useEffect(() => {
    if (textAreaTimeoutRef.current) clearTimeout(textAreaTimeoutRef.current);
    if (note.text !== textareaValue) {
      textAreaTimeoutRef.current = setTimeout(() => {
        const tags = Array.from(
          new Set(textareaValue.split(' ').filter((word) => word[0] === '#' && word.length > 1))
        );
        db.notes.put({ ...note, text: textareaValue, tags });
      }, 700);
    }
  }, [textareaValue]);

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    db.notes.delete(note.id);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleInputValue(e.target.value);
  };

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTextareaValue(e.target.value);
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
        <styled.NoteTitleInput type="text" value={titleInputValue} onChange={onInputChange} />

        <styled.TextareaContainer>
          <styled.NoteTextarea value={textareaValue} onChange={onTextareaChange} />
          <styled.TextareaOutput>
            {parseHTML(
              textareaValue
                .split(' ')
                .map((word) => {
                  if (word[0] === '#' && word.length > 1) {
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
