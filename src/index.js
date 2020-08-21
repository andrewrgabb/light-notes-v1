import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Board from './board';

const Structure = styled.div`
  padding: 20px;
}
`;

const Header = styled.h1`
  padding: 20px;
  text-align: center;
  border: 2px solid;
`;

function App() {
  return (
    <Structure>
      <Header id="Header">
        Light Notes
      </Header>
      <Board />
    </Structure>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);