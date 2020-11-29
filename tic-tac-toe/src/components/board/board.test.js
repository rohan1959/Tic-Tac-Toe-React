import { shallow } from 'enzyme';
import Square from '../square/square';
import Board from './board';

describe('test board component', () => {
  it('render board and check for 9 squares', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find(Square).getElements().length).toBe(9);
  });
});