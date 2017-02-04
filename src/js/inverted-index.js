/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.files = {};
    this.indexList = {};
  }

  /**
   * createIndex
   * @param {String} fileName name of the file to be indexed
   * @param {Object} fileContent contents of the file to be indexed
   * @return {Object} indexed file name and it's indices
   */
  createIndex(fileName, fileContent) {
    const currentFile = this.files[fileName];
    this.indexList[fileName] = this.indexList[fileName] || {};
    currentFile.forEach((book, index) => {
      const getContent = InvertedIndexUtilities
      .getTokens(`${book.title} ${book.text}`);
      getContent.forEach((word) => {
        if (this.indexList[fileName][word]) {
          this.indexList[fileName][word].push(index);
        } else {
          this.indexList[fileName][word] = [index];
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
    result[fileName] = this.indexList[fileName];
    return result;
    // return this.indexList[fileName];
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
    const fileName = filename ? [filename] : Object.keys(this.indexList);
    const searchTerms = InvertedIndexUtilities.getTokens(terms);
    fileName.forEach((file) => {
      searchTerms.forEach((word) => {
        const wordLocations = this.indexList[file][word];
        if (wordLocations) {
          result[file] = result[file] || {};
          result[file][word] = wordLocations;
        }
      });
    });
    return result;
  }
}
