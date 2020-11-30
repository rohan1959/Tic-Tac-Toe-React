import Square from './square';
import { shallow } from 'enzyme';


describe('test square component', () => {
  test('render square with button with value as passes by prop initially', () => {
    const wrapper = shallow(<Square value='X' />);
    expect(wrapper).toMatchSnapshot();
  });

  test('button to have on click property', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<Square onClick={mockCallBack} />);
    wrapper.find('button').simulate('click');
    expect(mockCallBack).toHaveBeenCalled();
  })
});

