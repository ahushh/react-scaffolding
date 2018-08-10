import { dataArrayToObject } from './data-array2object';

describe('dataArrayToObject', () => {
  it('returns corresponding object with `all` and `ids` fields', () => {
    const input = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Maria' },
      { id: 3, name: 'Jane' },
      { id: 4, name: 'Ann' },
    ];
    const output = {
      all: {
        1: { id: 1, name: 'John' },
        2: { id: 2, name: 'Maria' },
        3: { id: 3, name: 'Jane' },
        4: { id: 4, name: 'Ann' },
      },
      ids: [1, 2, 3, 4]
    };
    expect(
      dataArrayToObject(input)
    ).toMatchObject(output);
  });

  it('keeps ids order', () => {
    const input = [
      { id: 4, name: 'John' },
      { id: 2, name: 'Maria' },
      { id: 1, name: 'Jane' },
      { id: 3, name: 'Ann' },
    ];
    const output = {
      ids: [4, 2, 1, 3]
    };
    expect(
      dataArrayToObject(input)
    ).toMatchObject(output);
  });
  it('should handle custom id property name passed as second argument', () => {
    const input = [
      { code: 'USD', symbol: '$' },
      { code: 'RUB', symbol: 'r' },
    ];
    const output = {
      ids: ['USD', 'RUB'],
      all: {
        USD: { code: 'USD', symbol: '$' },
        RUB: { code: 'RUB', symbol: 'r' },
      }
    };
    expect(
      dataArrayToObject(input, 'code')
    ).toMatchObject(output);
  });
  it('should throw anderror if there is no specified field for id in object', () => {
    const input = [
      { code: 'USD', symbol: '$' },
      { code: 'RUB', symbol: 'r' },
    ];
    expect(
      () => dataArrayToObject(input, 'id')
    ).toThrow();
  });
  it('should throw an error if supplied data is not an array', () => {
    const input = { data: 1234 };
    expect(
      () => dataArrayToObject(input as any, 'id')
    ).toThrow();
  });
});
