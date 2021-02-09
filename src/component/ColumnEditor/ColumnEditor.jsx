import React from 'react';

import { Box, Title, Button } from './styles';

const ColumnEditor = ( props ) => {

  const {settings} = props;

  const {columnId, open, x, y, width, height, title, updateColumnTitle, saveColumnTitle} = settings; //saveColumnTitle

  //console.log(title)

  function handleTitleChange(e) {
    updateColumnTitle(columnId, e.target.value)
  }

  function handleOnClick() {
    saveColumnTitle(columnId, title)
  }

  //console.log({columnId, open})

  const columnEditor = open ? 
    <Box style={{left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`}}
      onClick={(event) => {event.stopPropagation();}}>
        Edit Column Title
      <Title onChange={handleTitleChange} 
        value={title} />
      <Button onClick={handleOnClick}>
        Save
      </Button>
    </Box>
  : null;

  return columnEditor;
}
//onChange={() => {updateColumnTitle(columnId)}
export default ColumnEditor;