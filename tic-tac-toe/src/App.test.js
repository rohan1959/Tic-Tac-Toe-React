import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';

test('renders header with Lets Play Tic Tac Toe', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tic Tac Toe/i);
  expect(linkElement).toBeInTheDocument();
});
test('render app with tic-tac-toe layout', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
