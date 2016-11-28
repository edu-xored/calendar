import * as React from 'react';

import Cell from './Cell';

const prepareData = (data) => {
  switch(data.type) {
    case 'user':
      return getUserComponent(data.content);
    case 'date':
      return getDateComponent(data.content);
    case 'event':
      break;
    default:
      return undefined;
  }
}

const getUserComponent = (user) => {
  return (
    <div className='user-data-cell'>
      <h4>
        {user.name}
      </h4>
    </div>
  );
}

const getDateComponent = (date) => {
  return (
    <div className='date-data-cell'>
      <p>
        { `${date.day} ${date.date}` }
      </p>
    </div>
  );
}


const Row = ({id, rowData, handleOnCellClick}) => (
  <div className='grid-row' id={id}>
    { rowData.map((cellData, i) => <Cell
                                      key={i}
                                      handleOnCellClick={handleOnCellClick}
                                    >
                                        { prepareData(cellData) }
                                    </Cell>) }
  </div>
);

export default Row;
