class InvertedIndex {
  constructor() {
    this.files = {};
    this.indexList = {};
    // this.myUtils = new InvertedIndexUtilities();
  }

  createIndex(filePath) {
    if (this.files.hasOwnProperty(filePath)) {
      const currentFile = this.files[filePath];
      this.indexList[filePath] = this.indexList[filePath] || {};
      const docLength = currentFile.length;
      for (let docIndex = 0; docIndex < docLength; docIndex += 1) {
        const currentDoc = currentFile[docIndex];
        const getContent = InvertedIndexUtilities.getToken(`${currentDoc.title} ${currentDoc.text}`);
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

  getIndex(fileName) {
    return this.indexList[fileName];
  }

  searchIndex(terms, filename) {
    // create  an object variable to store the result
    this.result = {};
    // check if a filename is given, else all the keysin the indexed files are searched
    const fileName = filename || Object.keys(this.indexList);
    // tokenize the search terms
    const validTerms = InvertedIndexUtilities.getToken(terms);
    // loop through the filename
    fileName.forEach((currentFile) => {
      if (currentFile in this.indexList) {
        validTerms.forEach((term) => {
          if (term in this.indexList[currentFile]) {
            if (currentFile in this.result) {
              this.result[currentFile][term] = this.indexList[currentFile][term];
            } else {
              this.result[currentFile] = {};
              this.result[currentFile][term] = this.indexList[currentFile][term];
            }
          }
        });
      }
    });
    return this.result;
  }
}
