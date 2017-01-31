(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=  {
    "hi": "Alice in Wonderland",
    "hey": "Alice falls into a rabbit hole and enters a world full of imagination."
  }

},{}],2:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],3:[function(require,module,exports){
module.exports=""
},{}],4:[function(require,module,exports){
/* Test Setup */
const myInvertedIndex = new InvertedIndex();

const book = require('./../books.json');
const emptyBook = require('./../empty-book.json');
const invalidBook = require('./../bad-book.json');

myInvertedIndex.files['book.json'] = book;

describe('Inverted Index', () => {
  describe('Read book data', () => {
    it('should check that the file uploaded is a valid JSON file', () => {
      expect(InvertedIndexUtilities.readBookData(invalidBook)).toEqual(false);
    });

    it('should check that the file uploaded is not empty', () => {
      expect(InvertedIndexUtilities.readBookData(emptyBook)).toEqual(false);
    });
  });

  describe('Populate Index', () => {
    it('should verify that the index is created once the JSON file has been read', () => {
      const index = myInvertedIndex.createIndex('book.json');
      expect(index['book.json']).toBeDefined();
    });

    it('should verify that the index maps the string keys to the correct objects in the JSON array', () => {
      const index = myInvertedIndex.getIndex('book.json');
      expect(myInvertedIndex.getIndex('book.json').and).toEqual([0, 1]);
    });
  });

  describe('Search Index', () => {
    it('should return an array of correct objects that contains the search terms', () => {
      expect(myInvertedIndex.searchIndex('alice fellowship', ['book.json'])).toEqual({'book.json': {alice: [0], fellowship: [1]}});
    });

    it('should go through all indexed files if a filename is not passed', () => {
      expect(myInvertedIndex.searchIndex('fellowship')).toEqual({'book.json': {fellowship: [1] } });
    });
  });
});

},{"./../bad-book.json":1,"./../books.json":2,"./../empty-book.json":3}]},{},[4])