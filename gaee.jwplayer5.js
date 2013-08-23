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

  this.timer = setInterval(function () {
    self.monitorStream();
  }, 1000);

  this.player = player;

  this.player.onReady(function () {
    console.log('onReady');
  }).onPlay(function () {
    self.onPlay();
    console.log('onPlay');
  }).onPause(function () {
    self.onPause();
    console.log('onPause');
  }).onIdle(function () {
    self.onIdle();
    console.log('onIdle');
  }).onError(function (error) {
    console.log('onError', error.message);
  });

}

JWPlayer5.prototype = new Gaee;

JWPlayer5.prototype.monitorStream = function () {
  var metadata = this.player.getMeta();

  if (metadata.code === 'NetStream.Play.Start') {
    // Stream starting up
    console.log('NetStream.Play.Start');
  } else if (metadata.code === 'NetStream.Buffer.Full') {
    // Stream playing
    console.log('NetStream.Buffer.Full');
  } else if (metadata.code === 'NetStream.Buffer.Flush') {
    // Stream paused
    console.log('NetStream.Buffer.Flush');
  } else if (metadata.code === 'NetStream.Buffer.Empty') {
    // Bandwidth problems
    console.log('NetStream.Buffer.Empty');
  } else if (metadata.code === 'NetConnection.Connect.NetworkChange') {
    // Network switch i.e. wired to wireless
    console.log('NetConnection.Connect.NetworkChange');
  } else if (metadata.code === 'NetConnection.Connect.Closed') {
    // Connection closed
    console.log('NetConnection.Connect.Closed');
  } else if (metadata.code === 'NetConnection.Connect.Failed') {
    // No network connection
    console.log('NetConnection.Connect.Failed');
  }

  return this;
}

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

JWPlayer5.prototype.onBufferEmpty = function () {
  this.send({
    category: 'gaee.jwplayer5',
    action: 'buffer empty',
    label: this.player.config.streamer + this.player.config.file
  });

  return this;
}

