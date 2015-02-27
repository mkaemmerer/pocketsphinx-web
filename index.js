'use strict';

var Sphinx = require('./src/sphinx');

(function(){
  /* global define */
  if ((typeof define !== 'undefined' && define !== null) && (define.amd !== null)) {
    define([], function() {
      return Sphinx;
    });
  } else if ((typeof module !== 'undefined' && module !== null) && (module.exports !== null)) {
    module.exports = Sphinx;
  }

  this.Sphinx = Sphinx;
}).call(window || this);
