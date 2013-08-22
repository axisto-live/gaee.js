/* global describe, it, beforeEach, afterEach, expect, Gaee */

'use strict';

(function () {

  describe('GAEE', function () {

    this.gaee = null;

    beforeEach(function () {
      this.gaee = new Gaee(_gaq);
    });

    afterEach(function () {
      if (this.gaee.timer !== null) {
        this.gaee.stopTimer();
      }

      this.gaee = null;
    });

    describe('#send()', function () {

      it('should send an event', function (done) {

        var self = this;

        this.gaee.on('send', function (data) {
          done();
        });

        this.gaee.send({
          category: 'gaee',
          action: 'send',
          label: 'test'
        });

      });

      it('should warn if either \'category\' or \'action\' are not provided', function () {

        var self = this;

        expect(function () {
          self.gaee.send({
            category: 'gaee',
            action: ''
          });
        }).to.throw(Error);

      });

      it('should warn if a \'value\' has been specified without a \'label\'', function () {

        var self = this;

        expect(function () {
          self.gaee.send({
            category: 'gaee',
            action: 'send',
            label: '',
            value: 0
          });
        }).to.throw(Error);

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

    describe('#getTime()', function () {

      it('should return the current time as UTC ISO 8601', function () {

        expect(this.gaee.getTime()).to.match(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);

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
