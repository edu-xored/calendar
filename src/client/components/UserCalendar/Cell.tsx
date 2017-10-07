import * as React from 'react';
import * as Moment from 'moment';

interface ICellCalendarProps {
    date: any;
    isEnable?: boolean;
    onCellClickHandle(value: number);
}

interface ICellCalendarState {
    isSelected: boolean;
}

export default class CellCalendar extends React.Component<ICellCalendarProps, {}> {
    static defaultProps = {
        isEnable: true
    }
    //static defaultState = {
    //    isSelected: false
    //}
    constructor(props) {
        super(props);
        //this.state = {isSelected: false};
    }

    render () {

        return (
            //<div className={ this.state.isSelected ? 'cell cell-isSelected' : 'cell'} onClick={ this.props.isEnable ? this.handleOnCellClick.bind(this) : undefined } >
            <div className='cell'>
                <div className={this.props.isEnable ? 'cell-enable' : 'cell-disable'} onClick={ this.props.isEnable ? this.handleOnCellClick.bind(this) : undefined }>
                    {this.props.date.date()}
                </div>
            </div>
        );
    }

    handleOnCellClick(e) {
        //this.state.isSelected === false ?  this.setState({isSelected: true}) : this.setState({isSelected: false});
        this.props.onCellClickHandle(this.props.date);
    }
}