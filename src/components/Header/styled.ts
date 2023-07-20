import styled from 'styled-components';

import { CenterContainer } from '../../styled/CenterContainer';

export const Header = styled.header`
  padding: 22px 0;
  width: 100%;
  font-size: 1.2rem;
  background-color: rgba(0, 0, 0, 0.06);
`;

export const HeaderContainer = styled(CenterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Heading = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
`;
