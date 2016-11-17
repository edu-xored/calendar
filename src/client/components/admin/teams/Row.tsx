import * as React from 'react';

import Cell from './Cell';

const Row = ({id, rowData}) => (
  <div className='grid-row' id={id}>
    { rowData.map((cellData, i) => <Cell key={i} data={cellData} />) }
  </div>
);

export default Row;