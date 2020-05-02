import GradientGenerator from './GradientGenerator';

describe('GradientGenerator', () => {
  test('it returns an array', () => {
    const startColor = '1a2b3c';
    const endColor = 'a1b2c3';

    const result = GradientGenerator.generate(startColor, endColor, 8);

    expect(Array.isArray(result)).toBe(true);
  });

  test('array length equals amount of specified steps', () => {
    const startColor = 'fedcba';
    const endColor = '012345';

    const result = GradientGenerator.generate(startColor, endColor, 10);
    const expectedLength = 10;

    expect(result.length).toEqual(expectedLength);
  });

  test('it returns an array of hex colors', () => {
    const result = GradientGenerator.generate('eee', 'aaa', 5);
    const expected = ['#eeeeee', '#dddddd', '#cccccc', '#bbbbbb', '#aaaaaa'];

    expect(result).toEqual(expected);
  });
});

describe('rgbToHex', () => {
  test('it converts an rgb value to hex', () => {
    expect(GradientGenerator._rgbToHex(1,1,1)).toEqual('#010101');
  });
});

describe('hexToRgb', () => {
  const testHex = 'a1b2c3';

  test('it only takes full character hex strings', () => {
    expect(GradientGenerator._hexToRgb('a1b2')).toBeNull();
  });

  test('returns an object', () => {
    expect(typeof GradientGenerator._hexToRgb(testHex)).toEqual('object');
  });

  test('it converts hex to rgb', () => {
    const expectedResult = { r: 161, g: 178, b: 195};
    const result = GradientGenerator._hexToRgb(testHex);

    expect(typeof result.r).toBe('number');
    expect(typeof result.g).toBe('number');
    expect(typeof result.b).toBe('number');

    expect(result).toEqual(expectedResult);
  });
});

describe('sanitize', () => {
  test('it removes the # sign from a string', () => {
    const testString = '#eee';
    const expectedResult = 'eee';

    expect(GradientGenerator._sanitize(testString)).toEqual(expectedResult);
  });

  test('it only removes # from the beginning of a string', () => {
    const testString = 'ee#e';
    const expectedResult = 'ee#e';

    expect(GradientGenerator._sanitize(testString)).toEqual(expectedResult);
  });
});

describe('fullHex', () => {
  test('it only takes 3 character hex strings', () => {
    const testString = 'eeee';

    expect(GradientGenerator._fullHex(testString)).toBeNull();
  });

  test('it converts a 3 character hex to 6 character hex', () => {
    const testHex = 'abc';
    const expectedResult = 'aabbcc';

    expect(GradientGenerator._fullHex(testHex)).toEqual(expectedResult);
  });
});
