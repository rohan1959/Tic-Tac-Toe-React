import { shallow } from 'enzyme';
import Square from '../square/square';
import Board from './board';
import { checkWinner } from '../../utilities/checkWinner';

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
  });

  it('click square to mark it with X on callback', () => {
    const wrapper = shallow(<Board />);
    const instance = wrapper.instance();
    wrapper.find(Square).at(1).simulate('click');
    expect(instance.state.squares.some(element => element === 'X')).toBeTruthy();
  });

  it('alternative X and O when click on square', () => {
    const wrapper = shallow(<Board />);
    const instance = wrapper.instance();
    wrapper.find(Square).at(1).simulate('click');
    wrapper.find(Square).at(5).simulate('click');
    expect(instance.state.squares[1]).toBe('X');
    expect(instance.state.squares[5]).toBe('O');
  });

  it('show the current player to make move', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('div.status').text()).toMatch(/Player to make move is/);
  });

  it('check for a winning pattern and true', () => {
    const wrapper = shallow(<Board />);
    const instance = wrapper.instance();
    wrapper.find(Square).at(0).simulate('click');
    wrapper.find(Square).at(5).simulate('click');
    wrapper.find(Square).at(1).simulate('click');
    wrapper.find(Square).at(4).simulate('click');
    wrapper.find(Square).at(2).simulate('click');
    expect(checkWinner(instance.state.squares)).toBeTruthy();
  });

  it('check for a winning pattern and false if no combination', () => {
    const wrapper = shallow(<Board />);
    const instance = wrapper.instance();
    wrapper.find(Square).at(1).simulate('click');
    wrapper.find(Square).at(5).simulate('click');
    wrapper.find(Square).at(2).simulate('click');
    wrapper.find(Square).at(4).simulate('click');
    wrapper.find(Square).at(3).simulate('click');
    expect(checkWinner(instance.state.squares)).toBeFalsy();
  });

  it('show winner if winner is exists and stop game', ()=> {
    const wrapper = shallow(<Board />);
    const instance = wrapper.instance();
    wrapper.find(Square).at(0).simulate('click');
    wrapper.find(Square).at(5).simulate('click');
    wrapper.find(Square).at(1).simulate('click');
    wrapper.find(Square).at(4).simulate('click');
    wrapper.find(Square).at(2).simulate('click');
    expect(wrapper.find('div.summary').text()).toMatch(/Winner/);

  })

});