import React from 'react';

import { DropdownBox } from './styles';

const Dropdown = ( props ) => {

  const {settings} = props;

  const {x, y, open} = settings;

  const dropdown = open ? <DropdownBox style={{left: `${x}px`, top: `${y}px` }} /> : null;

  return dropdown;
}

export default Dropdown;