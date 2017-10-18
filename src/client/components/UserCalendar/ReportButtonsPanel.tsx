import * as React from 'react';
import './style.scss';

interface IReportButtonsPanelProps {
    onReportButtonClick: (data: any) => void
}

interface IReportButtonsPanelState {
    panelId: string;
};

const FIRST_PANEL = 'first-panel';
const SECOND_PANEL = 'second-panel';
const THIRD_PANEL = 'third-panel';


export default class ReportButtonsPanel extends React.Component<IReportButtonsPanelProps, IReportButtonsPanelState> {
    constructor(props) {
        super(props);
        this.state = {panelId: FIRST_PANEL};
    }

    onButtonClick(e: any) {
        this.props.onReportButtonClick(e.target.id);
    }

    renderPanels() {
        let obj;
        switch (this.state.panelId) {
            case FIRST_PANEL:
                obj = 
                    <tr >
                        <td style={{width: '70vw'}}>
                            <div id={FIRST_PANEL} onClick={this.changePanel.bind(this)}>
                                TODAY
                            </div>
                        </td>
                    </tr>;
                break;
            case SECOND_PANEL:
                obj = 
                    <tr>
                        <td style={{width: '25vw'}}>
                            <div id='PTO' onClick={this.onButtonClick.bind(this)}>
                                PTO
                            </div>
                        </td>
                        <td style={{width: '25vw'}}>
                            <div id='PTO/2' onClick={this.onButtonClick.bind(this)}>
                                PTO/2
                            </div>
                        </td>
                        <td style={{width: '25vw'}}>
                            <div id='WFH' onClick={this.onButtonClick.bind(this)}>
                                WFH
                            </div>
                        </td>
                        <td style={{width: '25vw'}}>
                            <div id={SECOND_PANEL} onClick={this.changePanel.bind(this)}>
                                •••
                            </div>
                        </td>
                    </tr>;
                break;
            case THIRD_PANEL:
                obj = 
                    <tr>
                        <td style={{width: '25vw'}}>
                            <div id='BRB' onClick={this.onButtonClick.bind(this)}>
                                BRB
                            </div>
                        </td>
                        <td style={{width: '50vw'}}>
                            <div id='WHERE AM I' onClick={this.onButtonClick.bind(this)}>
                                WHERE AM I
                            </div>
                        </td>
                        <td style={{width: '25vw'}}>
                            <div id={THIRD_PANEL} onClick={this.changePanel.bind(this)}>
                                •••
                            </div>
                        </td>
                    </tr>;
                break;
        }
        return obj;
    }
    
    changePanel() {
        switch (this.state.panelId) {
            case FIRST_PANEL:
                this.setState({panelId: SECOND_PANEL});
                break;
            case SECOND_PANEL:
                this.setState({panelId: THIRD_PANEL});
                break;
            case THIRD_PANEL:
                this.setState({panelId: FIRST_PANEL});
                break;
        }
    }

    render() {
        return(
            <div id='button-panel'>
                <table className={this.state.panelId === FIRST_PANEL ? 'today-panel' : 'other-button-panel'}>
                    <tbody>
                        {this.renderPanels()}
                    </tbody>
                </table>
            </div>
        );
    }
}