/**
* GAEE.js v0.1.0
* 
* MIT licensed
*
* Copyright (C) 2013 Thomas Loudon
*/

/* global moment */

'use strict';

function Gaee(tracker) {
  this.tracker = tracker;
  this.timer = null;

  this.uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

  this.events = {
    timeUdated: [],
    send: []
  };

}

Gaee.prototype.send = function (data) {
  if (data.category.length === 0 || data.action.length === 0) {
    throw new Error('You must specifiy a \'category\' and an \'action\' to send a tracking event');
  }

  if (data.label.length === 0 && data.value !== undefined) {
    throw new Error('You must specifiy a \'label\' when providing a \'value\' in a tracking event');
  }

  this.tracker.push(['_trackEvent', data.category, data.action, data.label, data.value]);

  for (var i = 0; i < this.events.send.length; i++) {
    this.events.send[i](data);
  }

  return this;
};

Gaee.prototype.startTimer = function (interval) {
  if (this.timer !== null) {
    throw new Error('Only one timer allowed');
  }

  var self = this;
  this.timer = setInterval(function () {
    for (var i = 0; i < self.events.timeUdated.length; i++) {
      self.events.timeUdated[i]();
    }
  }, interval);

  return this.timer;
};

Gaee.prototype.stopTimer = function () {
  clearInterval(this.timer);
  this.timer = null;

  return this;
};

Gaee.prototype.getTime = function () {
  return moment().toISOString().substring(0, 19) + '.000Z';
};

Gaee.prototype.on = function (eventType, callback) {
  this.events[eventType].push(callback);
};
