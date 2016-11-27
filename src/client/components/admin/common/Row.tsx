import * as React from 'react';

import Cell from './Cell';
import { Team } from '../../../../lib/model';

interface IRowProps {
  id: string;
  rowData: any;
  onDelete?: (e: any) => void;
  onEdit?: (e: any) => void;
};

export default class Row extends React.Component<IRowProps, any> {
  render() {
    return (
      <div className='grid-row' id={this.props.id}>
        {this.props.rowData.map((cellData, i) => <Cell key={i} data={cellData} />)}
        <button onClick={this.props.onEdit}> Edit </button>
        <button onClick={this.props.onDelete}> Delete </button>
      </div>
    )
  }
}