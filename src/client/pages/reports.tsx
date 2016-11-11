import * as React from 'react';
import { Input, Popup, Container, Header, Image, Table} from 'semantic-ui-react';
import {DatePicker} from 'rc-datepicker';

export default class TabularReport extends React.Component<{}, {}> {
  state = {
    datePickerDate: '23-12-31',
    datePicker2Date: '23-12-31',
  };
  datePickerUpdated(jsDate, dateString) {this.state.datePickerDate = dateString;}
  datePicker2Updated(jsDate, dateString) {this.state.datePicker2Date = dateString;}
  render() {
    return (
      <Container>
        <Popup trigger={<Input icon='calendar' placeholder='Start date' children={this.state.datePickerDate} />} on='focus'>
          <DatePicker onChange={this.datePickerUpdated()} value={this.state.datePickerDate} />
        </Popup>
        -
        <Popup trigger={<Input icon='calendar' placeholder='Last date' children={this.state.datePicker2Date} />} on='focus'>
          <DatePicker onChange={this.datePicker2Updated()} value={this.state.datePicker2Date} />
        </Popup>
        <Table basic='very' celled>
          <Table.Header fullWidth={true}>
            <Table.Row>
              <Table.HeaderCell>Employee</Table.HeaderCell>
              <Table.HeaderCell>Rate</Table.HeaderCell>
              <Table.HeaderCell>PTO count</Table.HeaderCell>
              <Table.HeaderCell>Extra days</Table.HeaderCell>
              <Table.HeaderCell>Salary</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='http://semantic-ui.com/images/avatar2/small/lena.png' shape='rounded' size='mini'/>
                  <Header.Content>
                    Lena
                    <div className="sub header">Human Resources</div>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='http://semantic-ui.com/images/avatar2/small/matthew.png' shape='rounded' size='mini'/>
                  <Header.Content>
                    Matthew
                    <div className="sub header">Fabric Design</div>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                15
              </Table.Cell>
              <Table.Cell>
                15
              </Table.Cell>
              <Table.Cell>
                15
              </Table.Cell>
              <Table.Cell>
                15
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='http://semantic-ui.com/images/avatar2/small/lindsay.png' shape='rounded' size='mini'/>
                  <Header.Content>
                    Lindsay
                    <div className="sub header">Entertainment</div>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                12
              </Table.Cell>
              <Table.Cell>
                12
              </Table.Cell>
              <Table.Cell>
                12
              </Table.Cell>
              <Table.Cell>
                12
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    Summary
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                49
              </Table.Cell>
              <Table.Cell>
                49
              </Table.Cell>
              <Table.Cell>
                49
              </Table.Cell>
              <Table.Cell>
                49
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}
