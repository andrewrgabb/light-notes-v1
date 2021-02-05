import React from 'react';

import { OptionBox } from './styles';

const Option = ( props ) => {

  const {option, objectId} = props;

  return (<OptionBox onClick={() => {option.function(objectId)}}> {option.text} </OptionBox>);
}

export default Option;