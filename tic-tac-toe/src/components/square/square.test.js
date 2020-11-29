import { render, screen } from '@testing-library/react';
import Square from './square';
import { shallow } from 'enzyme';


describe('test square component', () => {

  test('render square with button with value no value initially', () => {
    render(<Square />);
    const linkElement = screen.getByText('X');
    expect(linkElement).toBeInTheDocument();
  });

  test('button to have on click property', () => {
    const mockCallBack = jest.fn();
    const button = shallow(<Square />);
    button.find('.square').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })
});

