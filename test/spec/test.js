/* global describe, it, beforeEach, afterEach, expect, Gaee */

'use strict';

(function () {

  describe('GAAE', function () {

    beforeEach(function () {
      this.gaee = new Gaee('UA-1234-1');
    });

    afterEach(function () {
      delete this.gaee;
    });

    it('should only accept a valid GA tracking code', function () {

      var self = this;

      var badCodes = [
        'ua-12345-1', // lower case
        'ua-12345-a', // non int ending
        '1-12345-a', // int beginning
        'UA-123-1', // too short
        'UA-1234567891-1' // too long
      ];

      badCodes.forEach(function (badCode) {
        expect(function () {
          self.gaee.isValidAccount(badCode);
        }).to.throw(Error);
      });

      expect(function () {
        self.gaee.isValidAccount('UA-1234-1');
      }).not.to.throw(Error);

    });

  });

})();
