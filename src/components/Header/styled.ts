import { styled, Button, FormControl } from '@mui/material';

import { CenterContainer } from '../../styled/CenterContainer';

export const Header = styled('header')`
  padding: 22px 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.06);
`;

export const HeaderContainer = styled(CenterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Heading = styled('h1')`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const AddButton = styled(Button)`
  font-size: inherit;
  text-transform: none;
  border-radius: 8px;
`;

export const FilterForm = styled(FormControl)`
  width: 160px;
`;
