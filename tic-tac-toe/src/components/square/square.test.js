import { render, screen } from '@testing-library/react';
import Square from './square';

test('render square with button with value as X', () => {
  render(<Square />);
  const linkElement = screen.getByText('X');
  expect(linkElement).toBeInTheDocument();
});
