/* global describe, it, before, after, expect, _gaq, jwplayer, JWPlayer5 */

'use strict';

(function () {

  var player = jwplayer('playback').setup({
    flashplayer: '../lib/jwplayer5/player.swf',

    streamer: 'rtmp://streaming.axisto-live.com/mediacache/_definst_/mp4:',
    file: 'axisto-live-production.s3.amazonaws.com/50ae56f78782bbae0100032f/media/axisto-test-video-v2-450k.mp4',

    autostart: false,
    volume: 100,

    width: 320,
    height: 180,

    debug: false
  });

  describe('GAEE JW Player 5', function () {

    this.gaee = null;

    before(function () {
      this.gaee = new JWPlayer5(_gaq, player);
    });

    after(function () {
      if (this.gaee.timer !== null) {
        this.gaee.stopTimer();
      }

      this.gaee = null;
    });

    it('should have a reference to an instance jwplayer', function () {
      expect(this.gaee.player).to.be.an('object');
      expect(this.gaee.player).to.include.keys('id');
      expect(this.gaee.player.id).to.equal('playback');
    });

    describe('#onPlay()', function () {

      it('should send a play event', function (done) {

        this.gaee.on('send', function () {
          done();
        });

        this.gaee.player.play();

      });

    });

    describe('#onPause()', function () {

      it('should send a pause event', function (done) {

        this.gaee.on('send', function () {
          done();
        });

        this.gaee.player.pause();

      });

    });

    describe('#onIdle()', function () {

      it('should send an idle event', function (done) {

        this.gaee.on('send', function () {
          done();
        });

        this.gaee.player.play();

        this.gaee.player.load('rtmp://nothing');

      });

    });

  });

})();
