import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  padding: 5px;
  background-color: #2eaee5;
  color: white;
  padding-left: 50px;
  position: fixed;
  width: 100%;
  z-index: 999;
  font-size: 25px;
`;


const Header = () => ( // eslint-disable-line react/prefer-stateless-function
  <HeaderWrapper>
    Typhoon
  </HeaderWrapper>
)

export default Header;
