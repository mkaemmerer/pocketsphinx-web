'use strict';

var CallbackManager = function() {
  var currentId = 0;
  var callbackPool = {};
  this.add = function(cb) {
    var id = currentId;
    callbackPool[id] = cb;
    currentId++;
    return id;
  };
  this.get = function(id) {
    if (callbackPool.hasOwnProperty(id)) {
      var cb = callbackPool[id];
      delete callbackPool[id];
      return cb;
    }
    return null;
  };
};


module.exports = CallbackManager;
