/**
* GAEE.js v0.1.0
* 
* MIT licensed
*
* Copyright (C) 2013 Thomas Loudon
*/

'use strict';

function JWPlayer5 (account, player) {
  Gaee.call(this, account);
  this.isValidAccount(this.account);

  this.player = player;

  this.player.onPlay(function () {
    console.log('play jwplayer5');
  });
}

JWPlayer5.prototype = new Gaee;
