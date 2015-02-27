'use strict';

//Imports:
var RSVP            = require('rsvp');
var AudioRecorder   = require('./util/audio-recorder');
var CallbackManager = require('./util/callback-manager');
var getMicrophone   = require('./util/get-microphone');


//Constructor
function Sphinx(path_to_workers){
  this.path_to_workers = path_to_workers || './workers';

  this._callbackManager = new CallbackManager();
  this.recorder         = this._startRecorder();
  this.recognizer       = this._startRecognizer();
}
//Control
Sphinx.prototype.startRecording = function(grammar_id){
  this.recorder
    .then(function(recorder){
      recorder.start(grammar_id);
    });
};
Sphinx.prototype.stopRecording = function(){
  this.recorder
    .then(function(recorder){
      recorder.stop();
    });
};
//Callbacks
Sphinx.prototype.onrecognition = function(){};

// This initializes the recognizer. When it calls back, we add words
Sphinx.prototype.initialize = function() {
  var init_recorder = this.recorder
    .then(this._initRecognizer.bind(this))
    .then(this._postMessage({ command: 'initialize' }));

  var set_consumer = RSVP.hash(this.recorder, this.recognizer)
    .then(function(results){
      var recorder   = results.recorder;
      var recognizer = results.recognizer;

      recorder.consumers.push(recognizer);
    });

  return RSVP.all([init_recorder, set_consumer]);
};
// This adds words to the recognizer
Sphinx.prototype.addWords = function(words) {
  return this._postMessage({
    command: 'addWords',
    data:    words
  });
};
// This adds a grammar to the recognizer
Sphinx.prototype.addGrammar = function(grammar) {
  return this._postMessage({
    command: 'addGrammar',
    data:    grammar
  });
};
// This adds words and a grammar to the recognizer
Sphinx.prototype.configure = function(words, grammar){
  return this.addWords(words)
    .then(function(){ return this.addGrammar(grammar); }.bind(this));
};


Sphinx.prototype._startRecorder   = function(){
  var path_to_workers = this.path_to_workers;
  return getMicrophone()
    .then(function(input){
      // Once the user authorises access to the microphone, we instantiate the recorder
      return new AudioRecorder(input, {
        worker:        path_to_workers + '/audioRecorderWorker',
        errorCallback: function() { /* ??? */ }
      });
    });

};
Sphinx.prototype._startRecognizer = function(){
  var dfd = RSVP.defer();

  var worker = new Worker(this.path_to_workers + '/recognizer.js');
  worker.onmessage = function() {
    dfd.resolve(worker);
  };
  worker.postMessage('');

  return dfd.promise;
};
Sphinx.prototype._initRecognizer = function(worker){
  var self = this;

  // This is the onmessage function, once the worker is fully loaded
  worker.onmessage = function(evt) {
    // This is the case when we have a callback id to be called
    if (evt.data.hasOwnProperty('id')) {
      var cb = self._callbackManager.get(evt.data.id);
      if(cb){
        var data = {};
        if (evt.data.hasOwnProperty('data')){
          data = evt.data.data;
        }
        cb(data);
      }
    }
    // This is a case when the recognizer has a new hypothesis
    if (evt.data.hasOwnProperty('hyp')) {
      self.onrecognition(evt);
    }
    // This is the case when we have an error
    if (evt.data.hasOwnProperty('status') && (evt.data.status === 'error')) {
      self.onerror(evt);
    }
  };

  return worker;
};
Sphinx.prototype._postMessage = function(msg){
  var manager = this._callbackManager;

  return function(worker){
    var dfd        = RSVP.defer();
    var message    = msg || {};
    msg.callbackId = manager.add(dfd.resolve.bind(dfd));
    worker.postMessage(message || {});
    return dfd.promise;
  };
};

module.exports = Sphinx;
