'use strict';

var RSVP = require('rsvp');

//Handle vendor prefixes
var AudioContext = window.AudioContext || window.webkitAudioContext;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


function getMicrophone(){
  var dfd = RSVP.defer();

  //Initialize Audio
  var audioContext;
  try {
    audioContext = new AudioContext();
  } catch (e) {
    dfd.reject(e);
  }
  //Initialize Microphone
  try {
    getUserMedia.call(navigator, {audio: true},
      //Success:
      function(stream){
        var input = audioContext.createMediaStreamSource(stream);
        // Firefox hack https://support.mozilla.org/en-US/questions/984179
        window.firefox_audio_hack = input;
        dfd.resolve(input);
      },
      //Failure
      function(e) {
        dfd.reject(e);
      });
  } catch (e) {
    dfd.reject(e);
  }

  return dfd.promise;
}


module.exports = getMicrophone;