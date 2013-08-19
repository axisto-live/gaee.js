/* global describe, it, beforeEach, afterEach, expect, Gaee */

'use strict';

(function () {

  describe('GAEE', function () {

    this.gaee = null;

    beforeEach(function () {
      this.gaee = new Gaee('UA-1234-1');
    });

    afterEach(function () {
      if (this.gaee.timer !== null) {
        this.gaee.stopTimer();
      }

      this.gaee = null;
    });

    describe('#isValidAccount', function () {

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

    describe('#startTimer()', function () {

      it('should return an interval object', function () {

        expect(this.gaee.startTimer(1000)).to.be.a('number');

      });

      it('should not allow multiple timers', function () {

        this.gaee.startTimer(1000);

        var self = this;

        expect(function () {
          self.gaee.startTimer(500);
        }).to.throw(Error);

      });

    });

    describe('#stopTimer()', function () {

      it('should clear the timer', function () {

        expect(this.gaee.stopTimer().timer).to.equal(null);

      });

    });

    describe('#on()', function () {

      describe('@timedUpdate', function () {

        it('should execute a callback on each interval', function (done) {

          var count = 0;

          this.gaee.on('timeUdated', function () {
            count++;
            if (count === 2) {
              done();
            }
          });

          this.gaee.startTimer(500);

        });

      });

      describe.skip('@buffer', function () {

        it('should execute a callback when playback buffers', function (done) {

          this.gaee.on('buffer', function () {
            done();
          });

        });

      });

      describe.skip('@error', function () {

        it('should execute a callback when a playback error occurs', function (done) {

          this.gaee.on('error', function () {
            done();
          });

        });

      });

    });

  });

})();
