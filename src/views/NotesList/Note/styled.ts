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

export const Text = styled('p')`
  margin: 4px 0 16px;
  word-break: break-word;
  white-space: pre-line;
`;

export const EditContainer = styled('div')`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const NoteTextarea = styled(TextareaAutosize)`
  padding: 4px 2px;
  font: inherit;
`;
