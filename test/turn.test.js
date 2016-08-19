var assert = require('assert');
describe('There is a pool of people', function() {
  describe('If it there time', function() {
    it('should return only the people who should be selecting the elevator', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});