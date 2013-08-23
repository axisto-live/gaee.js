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

  this.state = null;
  this.duration = 0;
  this.interval = 1000;

  this.timer = setInterval(function () {
    self.monitorStream();
    self.duration += self.interval;
  }, this.interval);

  this.player = player;

  this.player.onPlay(function () {
    self.onPlay();
  }).onPause(function () {
    self.onPause();
  }).onIdle(function () {
    self.onIdle();
  }).onError(function (error) {
    self.onError(error);
  });

}

JWPlayer5.prototype = new Gaee;

JWPlayer5.prototype.monitorStream = function () {
  var metadata = this.player.getMeta();

  if (metadata.code === 'NetStream.Play.Start') {
    // Stream starting up
    // console.log('NetStream.Play.Start');
  } else if (metadata.code === 'NetStream.Buffer.Full') {
    // Stream playing
    this.onBufferFull();
    // console.log('NetStream.Buffer.Full');
  } else if (metadata.code === 'NetStream.Buffer.Flush') {
    // Stream paused
    // console.log('NetStream.Buffer.Flush');
  } else if (metadata.code === 'NetStream.Buffer.Empty') {
    // Bandwidth problems
    this.onBufferEmpty();
    // console.log('NetStream.Buffer.Empty');
  } else if (metadata.code === 'NetConnection.Connect.NetworkChange') {
    // Network switch i.e. wired to wireless
    // console.log('NetConnection.Connect.NetworkChange');
  } else if (metadata.code === 'NetConnection.Connect.Closed') {
    // Connection closed
    // console.log('NetConnection.Connect.Closed');
  } else if (metadata.code === 'NetConnection.Connect.Failed') {
    // No network connection
    // console.log('NetConnection.Connect.Failed');
  }

  return this;
}

JWPlayer5.prototype.onPlay = function () {
  this.send({
    category: 'gaee.jwplayer5',
    action: 'play',
    label: this.player.config.streamer + '/' + this.player.config.file
  });

  return this;
}

JWPlayer5.prototype.onPause = function () {
  this.send({
    category: 'gaee.jwplayer5',
    action: 'pause',
    label: this.player.config.streamer + '/' + this.player.config.file
  });

  return this;
}

JWPlayer5.prototype.onIdle = function () {
  this.send({
    category: 'gaee.jwplayer5',
    action: 'idle',
    label: this.player.config.streamer + '/' + this.player.config.file
  });

  return this;
}

JWPlayer5.prototype.onBufferEmpty = function () {
  if (this.state !== 'buffering') {
    this.send({
      category: 'gaee.jwplayer5',
      action: 'buffer empty',
      label: this.player.config.streamer + '/' + this.player.config.file,
      value: this.duration / 1000
    });

    this.duration = 0;
    this.state = 'buffering';
  }

  return this;
}

JWPlayer5.prototype.onBufferFull = function () {
  if (this.state === 'buffering') {
    this.send({
      category: 'gaee.jwplayer5',
      action: 'buffer full',
      label: this.player.config.streamer + '/' + this.player.config.file,
      value: this.duration / 1000
    });

    this.duration = 0;
    this.state = 'playing';
  }

  return this;
}

