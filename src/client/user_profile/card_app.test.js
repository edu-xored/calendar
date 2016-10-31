import React from 'react';
import ReactDOM from 'react-dom';
import App from './card_app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Card />, div);
});
