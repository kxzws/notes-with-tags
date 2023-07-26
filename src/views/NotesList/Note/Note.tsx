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
  const [textareaValue, setTextareaValue] = useState<string>(note.text);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (note.text !== textareaValue) {
      timeoutRef.current = setTimeout(() => {
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

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <styled.TextareaContainer>
          <styled.NoteTextarea value={textareaValue} onChange={onTextareaChange} />
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
