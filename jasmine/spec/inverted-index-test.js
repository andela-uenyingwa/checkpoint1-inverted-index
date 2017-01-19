describe('Inverted Index', () => {
  describe('Read book data', () => {
    it('should check that the file uploaded is a valid JSON file', () => {
      expect(myInvertedIndex.readBookData([])).toBeFalsy();
    });

    it('should check that the file uploaded is not empty', () => {
      expect(myInvertedIndex.readBookData(book)).tobeTruthy();
    });
  });

  describe('Populate Index', () => {
    it('should verify that the index is created once the JSON file has been read', () => {
      expect(myInvertedIndex.createIndex('books.json')).toBeTruthy();
    });

    it('should verify that the index maps the string keys to the correct objects in the JSON array', () => {
      expect(myInvertedIndex.getIndex('books.json').alice).toEqual([0]);
    });
  });

  describe('Search Index', () => {
    it('should return an array of correct objects that contains the search terms', () => {
      expect(myInvertedIndex.searchIndex('alice fellowship', 'books.json').toEqual({'books.json': { alice: [ 0 ], fellowship: [1] } }));
    });
    it('should go through all indexed files if a filename is not passed', () => {
      expect(myInvertedIndex.searchIndex('alice fellowship').toEqual({'books.json': { alice: [ 0 ], fellowship: [1] } }));
    });
  });
});
