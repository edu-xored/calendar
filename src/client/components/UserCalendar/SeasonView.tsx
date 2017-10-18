import * as React from 'react';
import * as moment from 'moment';

import './style.scss';

interface ISeasonView {
    bold_part: string;
    nobold_part: string;
    className: string;
}

export default class SeasonView extends React.Component<ISeasonView, {}> {
    render() {
        return (
            <div id="season-view" className={this.props.className}>
                <span id="month">
                    {this.props.bold_part}
                </span>
                <span id="year">
                    {this.props.nobold_part}
                </span>
            </div>
        );
    }
}