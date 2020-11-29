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
    expect(wrapper.find('div#status').text()).toMatch(/Player to make move is/);
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

  it('show winner if winner is exists and stop game', () => {
    const wrapper = shallow(<Board />);
    wrapper.find(Square).at(0).simulate('click');
    wrapper.find(Square).at(5).simulate('click');
    wrapper.find(Square).at(1).simulate('click');
    wrapper.find(Square).at(4).simulate('click');
    wrapper.find(Square).at(2).simulate('click');
    expect(wrapper.find('div#summary').text()).toMatch(/Winner/);
  });

  it('reset button should be seen', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('button#reset').text()).toBe('Reset');
  });

  it('reset button on click should reset state of all squares', () => {
    const wrapper = shallow(<Board />);
    //click on few squares
    wrapper.find(Square).at(0).simulate('click');
    wrapper.find(Square).at(5).simulate('click');
    //click on reset all squares values should be reset to null
    wrapper.find('button#reset').at(0).simulate('click');
    const instance = wrapper.instance();
    expect(instance.state.squares.every(element => element === null)).toBeTruthy();
  });

  it('show game result for draw game', () => {
    const wrapper = shallow(<Board />);
    wrapper.find(Square).at(0).simulate('click');
    wrapper.find(Square).at(4).simulate('click');
    wrapper.find(Square).at(8).simulate('click');
    wrapper.find(Square).at(1).simulate('click');
    wrapper.find(Square).at(7).simulate('click');
    wrapper.find(Square).at(6).simulate('click');
    wrapper.find(Square).at(2).simulate('click');
    wrapper.find(Square).at(5).simulate('click');
    wrapper.find(Square).at(3).simulate('click');
    expect(wrapper.find('div#summary').text()).toMatch(/Draw/);
  });

  it('reset button should be disabled when no more are made yet', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('button#reset').props().disabled).toBeTruthy();
  });

  it('reset button should not be disable after a move is made',()=>{
    const wrapper = shallow(<Board />);
    wrapper.find(Square).at(0).simulate('click');
    expect(wrapper.find('button#reset').props().disabled).toBeFalsy();
  });

  it('should have a undo button', ()=> {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('button#undo').text()).toBe('Undo');
  });

  it('undo button should be disabled when no more are made yet', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('button#undo').props().disabled).toBeTruthy();
  });

});