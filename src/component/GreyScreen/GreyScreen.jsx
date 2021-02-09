import React from 'react';

import { Screen } from './styles';

const GreyScreen = ( props ) => {

  const {settings} = props;

  const {show, closePopUps} = settings;

  const width = window.innerWidth;
  const height = window.innerHeight - 50;

  const greyScreen = show ? 
    <Screen style={{width: width, height: height}} onClick={closePopUps}/>
  : null;

  return greyScreen;
}

export default GreyScreen;