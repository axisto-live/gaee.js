/**
* GAEE.js v0.0.1
* 
* MIT licensed
*
* Copyright (C) 2013 Thomas Loudon
*/

'use strict';

function Gaee(account) {
  this.account = account;

  this.isValidAccount(this.account);
}

Gaee.prototype.isValidAccount = function (account) {
  if (account.match(/^UA-\d{4,9}-\d{1,4}$/)) {
    return this;
  } else {
    throw new Error('Not a valid GA tracking code');
  }
};

Gaee.prototype.startTimer = function (interval) {
  var timer = setInterval(function () {
    
  }, interval);

  return timer;
};
