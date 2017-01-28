class InvertedIndexUtilities {

  static getToken(string) {
    const badValues = /[^a-zA-Z0-9\s]/g;
    const tokens = string.replace(badValues, ' ')
      .toLowerCase().split(' ')
      .filter(text =>
        text
      );
    return tokens;
  }

  static readBookData(data) {
    try {
      data.forEach((currentDoc) => {
        const hasTitle = currentDoc.hasOwnProperty('title');
        const hasText = currentDoc.hasOwnProperty('text');
        if (!hasTitle || !(hasText)) {
          return false;
        }
      });
      return true;
    }
    catch (err) {
      return false;
    }
  }
}

