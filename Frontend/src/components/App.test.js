import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  render(<App />);
  const divElement = screen.getByText(/hello world/i);
  expect(divElement).toBeInTheDocument();
});
