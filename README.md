# Overview

Pocketsphinx-Web is a an opinionated high-level wrapper for the [PocketSphinx.js speech recognizer](https://github.com/syl22-00/pocketsphinx.js).
It provides a convenient, promise-based API for loading pocketsphinx in a web-worker.


## Installing

[NPM](https://npmjs.org) users can install using:

```
npm install pocketsphinx-web
```


Alternatively, you can use a script tag to load pocketsphinx. The api will be available under the object```window.Sphinx```.


## Building

Pocketsphinx-Web is built using [Gulp](https://github.com/gulpjs/gulp). If you have [npm](https://npmjs.org) installed, you can build the project by calling

```
npm install && gulp 
```


## Examples

Web-workers can't be run directly from the filesystem, so to run the examples you will need to create a webserver.
You can start one using ```gulp example-server```, then load the example at ```localhost:9000```.


## Resources

I am not an expert on speech recognition, nor on pocketsphinx.
If you have speech recognition related questions, you are likely to find better answers from one of these sites:

* [PocketSphinx.js speech recognizer](https://github.com/syl22-00/pocketsphinx.js)
* [PocketSphinx](http://cmusphinx.sourceforge.net/)
* [CMU Pronunciation Dictionary site](http://www.speech.cs.cmu.edu/cgi-bin/cmudict)
* [CMUSphinx Tutorial](http://cmusphinx.sourceforge.net/wiki/tutorial)
