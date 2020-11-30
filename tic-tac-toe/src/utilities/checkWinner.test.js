import { checkWinner } from './checkWinner';

describe('validate check winner function', () => {
  it('check winner returns true when winner pattern exists', () => {
    const squares = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'O', 'X'];
    expect(checkWinner(squares)).toBeTruthy();
  });

  it('check winner returns false when winner pattern doesnot exists', () => {
    const squares = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'];
    expect(checkWinner(squares)).toBeFalsy();
  });

});