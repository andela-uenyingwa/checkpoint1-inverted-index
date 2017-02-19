/**
 * @class InvertedIndexUtilities
 */
class InvertedIndexUtilities {

  /**
   * cleanString
   * removes unwanted punctuations from string
   * @param{String} content string to remove unwanted punctuations from
   * @return {Array} an array of valid string
   */
  static cleanString(content) {
    const validCharacters = content.replace(/[^\w+]/gi, ' ')
    .toLowerCase()
    .split(' ');
    return validCharacters;
  }

  /**
   * getTokens
   * gets an array of tokens from a string
   * @param {String} content string to generate token from
   * @return {Array} an array of generated token
   */
  static getTokens(content) {
    let tokens = this.cleanString(content.toString());
    tokens = Array.from(new Set(tokens));
    tokens = tokens.filter((item, index) => {
      return item !== '';
    });
    return tokens;
  }

  /**
   * validateData
   * Reads content of JSON and checks for validity
   * @param {Object} file content of JSON to check for validity
   * @return {Boolean} validity status of the JSON content
   */
  static validateData(file) {
    let status = true;

    if (!Array.isArray(file) || file.length === 0) {
      status = false;
    }

    try {
      file.forEach((currentDoc) => {
        const hasTitle = currentDoc.title;
        const hasText = currentDoc.text;
        if (!hasTitle && !(hasText)) {
          status = false;
        }
      });
      return status;
    } catch (err) {
      return status;
    }
  }
}
