(function(Sphinx){
  'use strict';

  //A list of words, together with their pronounciations.
  //See the CMU Pronunciation guide for more information: http://www.speech.cs.cmu.edu/cgi-bin/cmudict
  var words = [
    ['NEW-YORK',          'N UW Y AO R K'],
    ['NEW-YORK-CITY',     'N UW Y AO R K S IH T IY'],
    ['PARIS',             'P AE R IH S'],
    ['PARIS(2)',          'P EH R IH S'],
    ['SHANGHAI',          'SH AE NG HH AY'],
    ['SAN-FRANCISCO',     'S AE N F R AE N S IH S K OW'],
    ['LONDON',            'L AH N D AH N'],
    ['BERLIN',            'B ER L IH N']
  ];
  var grammar = {numStates: 1, start: 0, end: 0, transitions: [{from: 0, to: 0, word: 'NEW-YORK'}, {from: 0, to: 0, word: 'NEW-YORK-CITY'}, {from: 0, to: 0, word: 'PARIS'}, {from: 0, to: 0, word: 'SHANGHAI'}, {from: 0, to: 0, word: 'SAN-FRANCISCO'}, {from: 0, to: 0, word: 'LONDON'}, {from: 0, to: 0, word: 'BERLIN'}]};



  //Create a new sphinx instance, which loads the web-worker scripts from '/sphinx/worker'.
  var sphinx = new Sphinx('/sphinx/worker');

  //Configure sphinx to listen for the words above, and use the grammar
  sphinx.configure(words, grammar)
    .then(function(){
      return sphinx.startRecording();
    })
    .then(function(){
      //sphinx.configure and sphinx.startRecording return *promises*
      //Inside this callback, sphinx is now ready and listening for cities
      console.log('READY');
    });

  //Set a callback for when sphinx has recognized a new word or phrase
  sphinx.onrecognition = function(event){
    console.log(event.data);
  };

})(window.Sphinx);
