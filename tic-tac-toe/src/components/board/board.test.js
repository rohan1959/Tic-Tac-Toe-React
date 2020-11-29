import { mount, shallow } from 'enzyme';
import Square from '../square/square';
import Board from './board';

describe('test board component', () => {
  it('render board and check for 9 squares', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find(Square).getElements().length).toBe(9);
  });

  it('initial state of the squares to be Null', () => {
    const wrapper = shallow(<Board />);
    const instance = wrapper.instance();
    expect(instance.state.squares[0]).toBe(null);
    expect(instance.state.squares.length).toBe(9);
    instance.state.squares.every(element => expect(element).toBe(null));
  })

  it('click square to mark it with X on callback', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<Board />);
    const instance = wrapper.instance();
    wrapper.find(Square).at(1).simulate('click');
    expect(instance.state.squares.some(element => element === 'X')).toBeTruthy();

  })

});