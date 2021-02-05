import React from 'react';
import Option from '../Option';

import { DropdownBox } from './styles';

const Dropdown = ( props ) => {

  const {settings} = props;

  const {objectId, open, x, y, width, options} = settings;

  const optionList = (
    options.map((option, index) => {
      return <Option option={option} objectId={objectId} key={index}/>
    })
  );

  const dropdown = open ? 
    <DropdownBox style={{left: `${x}px`, top: `${y}px`, width: `${width}px`}}>
      {optionList}
    </DropdownBox>  
  : null;

  return dropdown;
}

export default Dropdown;