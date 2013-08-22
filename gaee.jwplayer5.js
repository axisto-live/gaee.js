/**
* GAEE.js v0.1.0
* 
* MIT licensed
*
* Copyright (C) 2013 Thomas Loudon
*/

'use strict';

function JWPlayer5 (tracker, player) {
  var self = this;

  Gaee.call(this, tracker);

  this.player = player;

  this.player.onPlay(function () {
    self.onPlay();
  }).onPause(function () {
    self.onPause();
  }).onIdle(function () {
    self.onIdle();
  });

}

JWPlayer5.prototype = new Gaee;

JWPlayer5.prototype.onPlay = function () {
  this.send({
    category: 'gaee.jwplayer5',
    action: 'play',
    label: this.player.config.streamer + this.player.config.file
  });

  return this;
}

JWPlayer5.prototype.onPause = function () {
  this.send({
    category: 'gaee.jwplayer5',
    action: 'pause',
    label: this.player.config.streamer + this.player.config.file
  });

  return this;
}

JWPlayer5.prototype.onIdle = function () {
  this.send({
    category: 'gaee.jwplayer5',
    action: 'idle',
    label: this.player.config.streamer + this.player.config.file
  });

  return this;
}

