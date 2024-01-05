const timeToWords = require('./Timeword');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeToWords).toBe('function');
  });

  test('returns noon', () => {
    let noon = timeToWords('12:00');
    expect(noon).toBe('The time is: noon');
  })

  test('returns midnight', () => {
    let midnight = timeToWords('00:00');
    expect(midnight).toBe('The time is: midnight');
  })

  test('returns twelve-O-five pm', () => {
    let midnight = timeToWords('12:05');
    expect(midnight).toBe('The time is: twelve O-five pm');
  })
});
