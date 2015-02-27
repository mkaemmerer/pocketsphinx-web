(function(){
  'use strict';

  // This is the list of words that need to be added to the recognizer
  // This follows the CMU dictionary format
  var wordList = [
    ['ONE',               'W AH N'],
    ['TWO',               'T UW'],
    ['THREE',             'TH R IY'],
    ['FOUR',              'F AO R'],
    ['FIVE',              'F AY V'],
    ['SIX',               'S IH K S'],
    ['SEVEN',             'S EH V AH N'],
    ['EIGHT',             'EY T'],
    ['NINE',              'N AY N'],
    ['ZERO',              'Z IH R OW'],
    ['NEW-YORK',          'N UW Y AO R K'],
    ['NEW-YORK-CITY',     'N UW Y AO R K S IH T IY'],
    ['PARIS',             'P AE R IH S'],
    ['PARIS(2)',          'P EH R IH S'],
    ['SHANGHAI',          'SH AE NG HH AY'],
    ['SAN-FRANCISCO',     'S AE N F R AE N S IH S K OW'],
    ['LONDON',            'L AH N D AH N'],
    ['BERLIN',            'B ER L IH N'],
    ['SUCKS',             'S AH K S'],
    ['ROCKS',             'R AA K S'],
    ['IS',                'IH Z'],
    ['NOT',               'N AA T'],
    ['GOOD',              'G IH D'],
    ['GOOD(2)',           'G UH D'],
    ['GREAT',             'G R EY T'],
    ['WINDOWS',           'W IH N D OW Z'],
    ['LINUX',             'L IH N AH K S'],
    ['UNIX',              'Y UW N IH K S'],
    ['MAC',               'M AE K'],
    ['AND',               'AE N D'],
    ['AND(2)',            'AH N D'],
    ['O',                 'OW'],
    ['S',                 'EH S'],
    ['X',                 'EH K S']
  ];

  // This grammar recognizes digits
  var grammarDigits = {numStates: 1, start: 0, end: 0, transitions: [{from: 0, to: 0, word: 'ONE'},{from: 0, to: 0, word: 'TWO'},{from: 0, to: 0, word: 'THREE'},{from: 0, to: 0, word: 'FOUR'},{from: 0, to: 0, word: 'FIVE'},{from: 0, to: 0, word: 'SIX'},{from: 0, to: 0, word: 'SEVEN'},{from: 0, to: 0, word: 'EIGHT'},{from: 0, to: 0, word: 'NINE'},{from: 0, to: 0, word: 'ZERO'}]};
  // This grammar recognizes a few cities names
  var grammarCities = {numStates: 1, start: 0, end: 0, transitions: [{from: 0, to: 0, word: 'NEW-YORK'}, {from: 0, to: 0, word: 'NEW-YORK-CITY'}, {from: 0, to: 0, word: 'PARIS'}, {from: 0, to: 0, word: 'SHANGHAI'}, {from: 0, to: 0, word: 'SAN-FRANCISCO'}, {from: 0, to: 0, word: 'LONDON'}, {from: 0, to: 0, word: 'BERLIN'}]};
  // This is to play with beloved or belated OSes
  var grammarOses = {numStates: 7, start: 0, end: 6, transitions: [{from: 0, to: 1, word: 'WINDOWS'}, {from: 0, to: 1, word: 'LINUX'}, {from: 0, to: 1, word: 'UNIX'}, {from: 1, to: 2, word: 'IS'}, {from: 2, to: 2, word: 'NOT'}, {from: 2, to: 6, word: 'GOOD'}, {from: 2, to: 6, word: 'GREAT'}, {from: 1, to: 6, word: 'ROCKS'}, {from: 1, to: 6, word: 'SUCKS'}, {from: 0, to: 4, word: 'MAC'}, {from: 4, to: 5, word: 'O'}, {from: 5, to: 3, word: 'S'}, {from: 3, to: 1, word: 'X'}, {from: 6, to: 0, word: 'AND'}]};


  window.exampleGrammars = {
    digits: grammarDigits,
    cities: grammarCities,
    oses:   grammarOses,
    words:  wordList
  };

})();
