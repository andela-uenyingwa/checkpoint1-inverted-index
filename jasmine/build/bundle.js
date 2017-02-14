(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[{
  "hi": "Alice in Wonderland",
  "hey": "Alice falls into a rabbit hole and enters a world full of imagination."
}]

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
module.exports=[]

},{}],4:[function(require,module,exports){
/* Test Setup */
const myInvertedIndex = new InvertedIndex();

const book = require('./../books.json');
const emptyBook = require('./../empty-book.json');
const invalidBook = require('./../bad-book.json');

describe('Inverted Index', () => {
  describe('Validate JSON data', () => {
    it(`should return false if the file
    uploaded is not a valid JSON file`, () => {
      expect(InvertedIndexUtilities.validateData(invalidBook))
      .toEqual(false);
      expect(InvertedIndexUtilities.validateData(2)).toEqual(false);
      expect(InvertedIndexUtilities.validateData(emptyBook))
      .toEqual(false);
    });

    it('should return true for valid JSON file', () => {
      expect(InvertedIndexUtilities.validateData(book)).toEqual(true);
    });
  });

  describe('Populate Index', () => {
    it(`should verify that the index is created once the JSON
    file has been read`, () => {
      const myMap = myInvertedIndex.indexMap;
      myInvertedIndex.createIndex('books.json', book);
      expect(Object.prototype.hasOwnProperty.call(myMap, 'books.json'))
      .toEqual(true);
      expect(Object.keys(myMap['books.json']).length).not.toEqual(0);
      expect(Object.keys(myMap['books.json']).length).toEqual(31);
    });

    it(`should verify that the index maps the string keys to
    the correct objects in the JSON array`, () => {
      const index = myInvertedIndex.getIndex('books.json');
      expect(index['books.json'].and).toEqual([0, 1]);
      expect(index['books.json'].alice).toEqual([0]);
      expect(index['books.json'].lord).toEqual([1]);
    });

    it('should return undefined for nonexisting words', () => {
      const index = myInvertedIndex.getIndex('books.json');
      expect(index['books.json'].enyingwa).toBeUndefined();
    });
  });

  describe('Search Index', () => {
    it('should attach a search result to the filename', () => {
      const result = myInvertedIndex.searchIndex('alice', 'books.json');
      expect((Object.keys(result)).includes('books.json')).toBeTruthy();
      expect((Object.keys(result['books.json'])).includes('alice')).toBeTruthy();
      expect(result['books.json'].alice).toEqual(myInvertedIndex.indexMap['books.json'].alice);
    });

    it(`should return an array of correct objects that contains
    the search terms`, () => {
      expect(myInvertedIndex
      .searchIndex('alice fellowship', 'books.json')).toEqual({
        'books.json': {
          alice: [0],
          fellowship: [1]
        }
      });
    });

    it('should return an empty array, if search term is not found', () => {
      expect(myInvertedIndex.searchIndex('uloaku code', 'books.json')).toEqual({
        'books.json': {
          uloaku: [],
          code: []
        }
      });
    });

    it(`should go through all indexed files if a filename is
    not passed`, () => {
      expect(myInvertedIndex.searchIndex('fellowship')).toEqual({
        'books.json': {
          fellowship: [1]
        }
      });
    });
  });
});

},{"./../bad-book.json":1,"./../books.json":2,"./../empty-book.json":3}]},{},[4])