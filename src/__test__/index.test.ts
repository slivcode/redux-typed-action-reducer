import TypedReducer from '../index';

describe('redux test', () => {
  test('base test', () => {
    const R = TypedReducer<boolean>({ ns: 'switch', init: false })({
      toggle: (a?, b?, c?) => i => !i,
    });
    expect(R).toBeTruthy();
    expect(R.reducer).toBeTruthy();
    expect(R.toggle).toBeTruthy();
    expect(R.reducer(undefined, {})).toBeFalsy();
    expect(R.toggle(1, 2, 3)['args']).toEqual([1, 2, 3]);
    expect(R.toggle()['type']).toEqual('switch::toggle');
    expect(R.reducer(false, R.toggle())).toBeTruthy();
    expect(R.toggle['type']).toEqual('switch::toggle');
  });
});