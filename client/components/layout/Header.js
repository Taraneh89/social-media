import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <MainHeader>
      Header
      <span>this is span</span>
      <div id="header"></div>
      <div className="my-div-in-header"></div>
    </MainHeader>
  );
};

const MainHeader = styled.header(() => {
  return `
    color: red;
    span {
      color: blue;
    }
    #header {
      color: black;
    }
    .my-div-in-header {
      color: yellow;
    }
  `;
});

export default Header;
