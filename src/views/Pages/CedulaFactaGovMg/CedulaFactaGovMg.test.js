import React from 'react';
import ReactDOM from 'react-dom';
import CedulaFactaGovMg from './CedulaFactaGovMg';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CedulaFactaGovMg />, div);
  ReactDOM.unmountComponentAtNode(div);
});
