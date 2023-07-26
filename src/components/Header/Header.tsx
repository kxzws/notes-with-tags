import { useEffect, useState } from 'react';
import {
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../../db';
import { notesSlice } from '../../redux/notes/slices';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { Note } from '../../utils/types';
import * as styled from './styled';

interface HeaderProps {
  notes?: Note[];
}

export const Header = ({ notes }: HeaderProps) => {
  const { filterList, selectedFilterValues } = useTypedSelector((state) => state.notes);
  const { updateFilteredNotes, setSelectedFilterValues } = notesSlice.actions;
  const dispatch = useAppDispatch();

  const [selectedFilters, setSelectedFilters] = useState<string[]>(selectedFilterValues);

  useEffect(() => {
    setSelectedFilters(selectedFilterValues);
  }, [selectedFilterValues]);

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    db.notes.add({ id: uuidv4(), text: 'New note #hi', tags: ['#hi'] });
  };

  const onFilterChange = (e: SelectChangeEvent<string[]>) => {
    setSelectedFilters(
      typeof e.target.value === 'string' ? e.target.value.split(' ') : e.target.value
    );
    dispatch(
      setSelectedFilterValues(
        typeof e.target.value === 'string' ? e.target.value.split(' ') : e.target.value
      )
    );
    dispatch(updateFilteredNotes(notes || []));
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

        <styled.FilterForm size="small">
          <InputLabel id="multiple-select-label">Tags</InputLabel>
          <Select
            labelId="multiple-select-label"
            id="multiple-select"
            value={selectedFilters}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => selected.join(' ')}
            onChange={onFilterChange}
            multiple
          >
            {filterList.map((filter) => (
              <MenuItem key={filter} value={filter}>
                <ListItemText primary={filter} />
              </MenuItem>
            ))}
          </Select>
        </styled.FilterForm>
      </styled.HeaderContainer>
    </styled.Header>
  );
};
