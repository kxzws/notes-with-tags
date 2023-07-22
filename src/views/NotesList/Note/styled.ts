import { styled, Card, IconButton, TextareaAutosize, CardContent } from '@mui/material';

export const Note = styled(Card)`
  width: 100%;
`;

export const NoteContent = styled(CardContent)`
  padding-top: 0;
`;

export const DeleteButton = styled(IconButton)`
  margin-left: auto;
`;

export const IdText = styled('p')`
  margin: auto 0;
  font-size: 0.6rem;
  font-weight: bold;
`;

export const TextareaContainer = styled('div')`
  height: fit-content;
  width: 100%;
  position: relative;
`;

export const TextareaOutput = styled('div')`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  word-break: break-word;
  pointer-events: none;
`;

export const NoteTextarea = styled(TextareaAutosize)`
  padding: 0;
  width: 100%;
  position: relative;
  z-index: 0;
  font: inherit;
  background: transparent;
  border: none;
  outline: none;
  resize: none;

  &:not([value='']) {
    -webkit-text-fill-color: transparent;
  }
`;

export const TagContainer = styled('p')`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4px;
  word-break: break-word;
`;

export const Tag = styled('span')`
  color: blue;
`;
