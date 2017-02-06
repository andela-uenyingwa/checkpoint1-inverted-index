/* Test Setup */
const myInvertedIndex = new InvertedIndex();

const book = require('./../books.json');
const emptyBook = require('./../empty-book.json');
const invalidBook = require('./../bad-book.json');

myInvertedIndex.files['book.json'] = book;

describe('Inverted Index', () => {
  describe('Validate JSON data', () => {
    it('should check that the file uploaded is a valid JSON file', () => {
      expect(InvertedIndexUtilities.validateData(invalidBook)).toEqual(false);
    });

    it('should check that the file uploaded is not empty', () => {
      expect(InvertedIndexUtilities.validateData(emptyBook)).toEqual(false);
    });
  });

  describe('Populate Index', () => {
    it(`should verify that the index is created once the JSON
    file has been read`, () => {
      const index = myInvertedIndex.createIndex('book.json');
      expect(index['book.json']).toBeDefined();
      expect(typeof (index)).toBe('object');
    });

    it(`should verify that the index maps the string keys to
    the correct objects in the JSON array`, () => {
      index = myInvertedIndex.getIndex('book.json');
      expect(index['book.json'].and).toEqual([0, 1]);
      expect(index['book.json'].alice).toEqual([0]);
      expect(index['book.json'].lord).toEqual([1]);
    });
  });

  describe('Search Index', () => {
    it(`should return an array of correct objects that contains
    the search terms`, () => {
      expect(myInvertedIndex
      .searchIndex('alice fellowship', ['book.json'])).toEqual({
        'book.json': {
          alice: [0],
          fellowship: [1]
        }
      });
    });

    it(`should go through all indexed files if a filename is
    not passed`, () => {
      expect(myInvertedIndex.searchIndex('fellowship')).toEqual({
        'book.json': {
          fellowship: [1]
        }
      });
    });
  });
});
