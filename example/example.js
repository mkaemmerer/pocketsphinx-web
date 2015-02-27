(function(Sphinx, exampleGrammars){
  'use strict';

  var sphinx = new Sphinx('/sphinx/worker');
  sphinx.configure(exampleGrammars.words, exampleGrammars.cities)
    .then(function(){
      return sphinx.startRecording();
    })
    .then(function(){
      console.log('READY');
    });

  sphinx.onrecognition = function(event){
    console.log(event.data);
  };

})(window.Sphinx, window.exampleGrammars);
