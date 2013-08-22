/**
* GAEE.js v0.1.0
* 
* MIT licensed
*
* Copyright (C) 2013 Thomas Loudon
*/

/* global moment */

'use strict';

function Gaee(account) {
  this.account = account;
  this.timer = null;

  this.events = {
    timeUdated: [],
    buffer: [],
    error: []
  };

}

Gaee.prototype.isValidAccount = function (account) {
  if (account.match(/^UA-\d{4,9}-\d{1,4}$/)) {
    return this;
  } else {
    throw new Error('Not a valid GA tracking code');
  }
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
  return moment().toISOString();
};

Gaee.prototype.on = function (eventType, callback) {
  this.events[eventType].push(callback);
};
