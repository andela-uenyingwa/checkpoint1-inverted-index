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
 * @param {Object} filePath name of the indexed file
 * @return {Object} indexed file name and it's indices
 */
  createIndex(filePath) {
    if (this.files.hasOwnProperty(filePath)) {
      const currentFile = this.files[filePath];
      this.indexList[filePath] = this.indexList[filePath] || {};
      const docLength = currentFile.length;
      for (let docIndex = 0; docIndex < docLength; docIndex += 1) {
        const currentDoc = currentFile[docIndex];
        const getContent = InvertedIndexUtilities.getToken(
          `${currentDoc.title} ${currentDoc.text}`);
        getContent.forEach((word) => {
          if (this.indexList[filePath].hasOwnProperty(word)) {
            if (this.indexList[filePath][word].indexOf(docIndex) === -1) {
              this.indexList[filePath][word].push(docIndex);
            }
          } else {
            this.indexList[filePath][word] = [docIndex];
          }
        });
      }
    }
    return this.indexList;
  }

/**
 * getIndex
 * Returns index map of a file
 * @param {String} fileName name of file to return index map
 * @return {Object} a key pair value of each word and their index
 */
  getIndex(fileName) {
    return this.indexList[fileName];
  }

/**
 * searchIndex
 * Search for terms in a file
 * @param {String} terms word(s) to be searched in the index
 * @param {String} filename file to search for words
 * @return {Object} words and their index
 */
  searchIndex(terms, filename) {
    this.result = {};
    const fileName = filename || Object.keys(this.indexList);
    const validTerms = InvertedIndexUtilities.getToken(terms);
    fileName.forEach((currentFile) => {
      if (currentFile in this.indexList) {
        validTerms.forEach((term) => {
          if (term in this.indexList[currentFile]) {
            if (currentFile in this.result) {
              this.result[currentFile][term] = this
              .indexList[currentFile][term];
            } else {
              this.result[currentFile] = {};
              this.result[currentFile][term] = this
              .indexList[currentFile][term];
            }
          }
        });
      }
    });
    return this.result;
  }
}
