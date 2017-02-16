/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.indexMap = {};
  }

  /**
   * createIndex
   * @param {String} fileName name of the file to be indexed
   * @param {Object} fileContent contents of the file to be indexed
   * @return {Object} indexed file name and it's indices
   */
  createIndex(fileName, fileContent) {
    this.indexMap[fileName] = {};

    fileContent.forEach((book, index) => {
      const getContent = InvertedIndexUtilities
      .getTokens(`${book.title} ${book.text}`);

      getContent.forEach((word) => {
        if (this.indexMap[fileName][word]) {
          this.indexMap[fileName][word].push(index);
        } else {
          this.indexMap[fileName][word] = [index];
        }
      });
    });
  }

  /**
   * getIndex
   * Returns index map of a file
   * @param {String} fileName name of file to return index map
   * @return {Object} a key pair value of each word and their index
   */
  getIndex(fileName) {
    const result = {};
    result[fileName] = this.indexMap[fileName];
    return result;
  }

  /**
   * searchIndex
   * Search for terms in a file
   * @param {String} terms word(s) to be searched in the index
   * @param {String} filename file to search for words
   * @return {Object} words and their index
   */
  searchIndex(terms, filename) {
    const result = {};
    const fileName = filename ? [filename] : Object.keys(this.indexMap);
    const searchTerms = InvertedIndexUtilities.getTokens(terms);

    fileName.forEach((file) => {
      searchTerms.forEach((word) => {
        const wordLocations = this.indexMap[file][word];
        result[file] = result[file] || {};

        if (wordLocations) {
          result[file][word] = wordLocations;
        } else {
          result[file][word] = [];
        }
      });
    });
    return result;
  }
}
