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
    });

    it('should return false if the file uploaded is empty', () => {
      expect(InvertedIndexUtilities.validateData(emptyBook))
      .toEqual(false);
    });
  });

  describe('Populate Index', () => {
    it(`should verify that the index is created once the JSON
    file has been read`, () => {
      const myMap = myInvertedIndex.indexMap;
      const index = myInvertedIndex.createIndex('books.json', book);
      expect(Object.prototype.hasOwnProperty.call(myMap, 'books.json')).toEqual(true);
      // expect(typeof (index)).toBe('object');
    });

    it(`should verify that the index maps the string keys to
    the correct objects in the JSON array`, () => {
      index = myInvertedIndex.getIndex('books.json');
      expect(index['books.json'].and).toEqual([0, 1]);
      expect(index['books.json'].alice).toEqual([0]);
      expect(index['books.json'].lord).toEqual([1]);
    });
  });

  describe('Search Index', () => {
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
