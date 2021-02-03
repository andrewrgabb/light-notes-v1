import React from 'react';

import { OptionBox } from './styles';

const Option = ( props ) => {

  const {text} = props;

  return (<OptionBox> {text} </OptionBox>);
}

export default Option;