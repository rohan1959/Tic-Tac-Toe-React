import { render, screen } from '@testing-library/react';
import Square from './square';

test('render square without any value', () => {
  render(<Square />);
  const linkElement = screen.getByText('');
  expect(linkElement).toBeInTheDocument();
});
