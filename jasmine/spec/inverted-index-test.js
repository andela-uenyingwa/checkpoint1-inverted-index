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
      expect(Object.keys(myMap['books.json']).length).toEqual(25);
    });

    it(`should verify that the index maps the string keys to
    the correct objects in the JSON array`, () => {
      const index = myInvertedIndex.getIndex('books.json');
      expect(index['books.json'].and).toEqual([0, 1]);
      expect(index['books.json'].alice).toEqual([0]);
      expect(index['books.json'].hobbit).toEqual([1]);
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
      expect((Object.keys(result['books.json'])).includes('alice'))
      .toBeTruthy();
      expect(result['books.json'].alice).toEqual(myInvertedIndex
      .indexMap['books.json'].alice);
    });

    it(`should return search result for a varied
    number of search terms`, () => {
      expect(myInvertedIndex
      .searchIndex('alice ring', 'books.json')).toEqual({
        'books.json': {
          alice: [0],
          ring: [1]
        }
      });
    });

    it('should return search result for an array of search terms', () => {
      expect(myInvertedIndex
      .searchIndex(['alice', 'ring'], 'books.json')).toEqual({
        'books.json': {
          alice: [0],
          ring: [1]
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
      myInvertedIndex.createIndex('bk.json', book);
      expect(myInvertedIndex.searchIndex('wizard')).toEqual({
        'books.json': {
          wizard: [1]
        },
        'bk.json': {
          wizard: [1]
        }
      });
    });
  });
});
