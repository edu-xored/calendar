import * as React from 'react';

import { Form, Button, Header, Modal } from 'semantic-ui-react';
import '../../styles/event-modal-dialog';

const eventModalWrapperClassName = 'event-modal-wrapper';

export default class EventModal extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const eventTypes = [
      {text: 'PTO', value: 'pto'}
    ];
    return (
      <div className={eventModalWrapperClassName} onClick={this.onModalClick.bind(this)}>
        <div className='event-modal'>
          <div className='event-modal-header'>
            <Header
              content='EventModal Header'
              className='event-modal-title'
              textAlign='left'
              size='medium'
              dividing={true}
            />
            <div className='event-modal-controls'>
              <Button icon='hide' onClick={ this.onHideEventModal.bind(this) } compact circular/>
            </div>
          </div>
          <div className='event-modal-content'>
            <Form onSubmit={ this.onFormSubmit.bind(this) }>
              <Form.Field label='Title' name='event-title' control='input' type='text' inline required />
              <Form.Field label='Comment' name='event-comment' control='textarea' type='text' />
              <Form.Select
                inline
                label='Event Type'
                name='event-type'
                options={eventTypes}
                placeholder='Event Type'
              />
              <Form.Field label='Start' name='event-start' control='input' type='text' inline required />
              <Form.Field label='End' name='event-end' control='input' type='text' inline required />
              <Button
                basic
                color='grey'
                content='Cancel'
                onClick={ this.onCloseEventModal.bind(this) }
              />
              <Button
                color='green'
                content='Submit'
                className='event-dialog-submit-btn'
              />

            </Form>
          </div>
        </div>
      </div>
    );
  }

  onFormSubmit(event) {
    event.preventDefault();
    let eventTitle = event.target.elements['event-title'].value;
    let eventComment = event.target.elements['event-comment'].value;
    let eventStart = event.target.elements['event-start'].value;
    let eventEnd = event.target.elements['event-end'].value;
    // validate form data
    // const data = {};
    // pass validated data from Form to parent node
    this.props.onFormSubmit({
      eventTitle,
      eventComment,
      eventStart,
      eventEnd
    });

    this.props.onCloseEventModal();
  }

  onHideEventModal(event) {
    event.preventDefault();
    this.props.onCloseEventModal();
  }

  onCloseEventModal(event) {
    event.preventDefault();
    this.props.onCloseEventModal();
  }

  onModalClick(event) {
    if (event.target.className === eventModalWrapperClassName) {
      this.onCloseEventModal(event);
    }
  }
}
