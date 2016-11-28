import * as React from 'react';

import { Form, Button, Header, Modal } from 'semantic-ui-react';
import '../../styles/event-modal-dialog';

const eventModalWrapperClassName = 'event-modal-wrapper';

export default class EventModal extends React.Component<any, any> {
  render() {
    const eventTypes = [
      {text: 'PTO', value: 'pto'},
      {text: 'WFH', value: 'wfh'}
    ];
    return (
      <div className={ eventModalWrapperClassName } onClick={ this.onModalClick.bind(this) }>
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
              {false && <Button icon='hide' onClick={ this.onHideEventModal.bind(this) } compact circular/>}
            </div>
          </div>
          <div className='event-modal-content'>
            <Form onSubmit={ this.onFormSubmit.bind(this) }>
              <Form.Field label='Comment' name='event-comment' control='input' type='text' />
              <Form.Select
                inline
                label='Event Type'
                name='event-type'
                options={ eventTypes }
                placeholder='Event Type'
              />
              <Form.Field label='Start' name='event-start' control='input' type='text' inline required placeholder='dd/mm/yyyy' />
              <Form.Field label='End' name='event-end' control='input' type='text' inline required placeholder='dd/mm/yyyy' />
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

    const elements = event.target.elements;
    let formData = {
      comment: elements['event-comment'].value.trim(),
      start: elements['event-start'].value.trim(),
      end: elements['event-end'].value.trim(),
      type: elements['event-type'].value.trim()
    };

    const res = parseForm(formData);
    if (res.success) {
      this.props.onFormSubmit(res.form);
      this.props.onCloseEventModal();
    } else {
      // display error message for each wrong field
      console.error('Invalid form fields: ', res.wrongFields);
    }
  }

  onHideEventModal(event) {
    event.preventDefault();
    // TODO: implement hiding
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

// helper functions

const parseForm = ({ comment, start, end, type }) => {
  let res = {
    success: true,
    form: {} as any,
    wrongFields: []
  };

  start = parseDate(start);
  if (start == null) {
    res.success = false;
    res.wrongFields.push('start');
  } else {
    res.form.start = start;
  }

  end = parseDate(end);
  if (end == null) {
    res.success = false;
    res.wrongFields.push('end');
  } else {
    res.form.end = end;
  }

  res.form.comment = comment;
  res.form.type = type;

  return res;
}

const parseDate = (stringDate) => {
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (stringDate.match(datePattern) == null) return null;
  const intDate = stringDate.split('/').map(str => parseInt(str));
  const year = intDate[2]
  const month = intDate[1];
  const date = intDate[0]
  console.log(year, month, date);
  // check year
  if (year < 2015 || year > 2030) return null;
  // check month
  if (month < 1|| month > 12) return null;
  // check date
  let testDate = new Date(year, month + 1, 0); // points to last day in month
  if (date < 1 || date > testDate.getDate()) return null;

  return new Date(year, month - 1, date).toString();
}
