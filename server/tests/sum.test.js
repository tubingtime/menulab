// Simple test to test Jest test framework.
const sum = require('../routes/sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
