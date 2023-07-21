import { styled } from '@mui/material';
import Masonry from 'react-masonry-css';

import { CenterContainer } from '../../styled/CenterContainer';

export const Main = styled('main')`
  padding: 30px 0;
`;

export const MainMasonry = styled(Masonry)`
  display: flex;
  margin-left: -40px;
  width: auto;

  & .notes-list__masonry {
    padding-left: 40px;
    background-clip: padding-box;

    & > div {
      margin-bottom: 30px;
    }
  }
`;

export const MainContainer = styled(CenterContainer)``;
