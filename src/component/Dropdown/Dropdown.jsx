import React from 'react';

import { DropdownBox } from './styles';

const Dropdown = ( props ) => {

  const {settings} = props;

  if (Object.keys(settings).length === 0) {
    return null;
  }

  const {x, y} = settings
  
  return (
    <DropdownBox style={{left: `${x}px`, top: `${y}px` }} />
  );
}

export default Dropdown;