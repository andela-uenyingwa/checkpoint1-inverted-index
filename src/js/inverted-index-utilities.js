/**
 * @class InvertedIndexUtilities
 */
class InvertedIndexUtilities {

  /**
   * cleanString
   * removes unwanted punctuations from string
   * @param{String} string string to remove unwanted punctuations from
   * @return {Array} an array of valid string
   */
  static cleanString(string) {
    const validCharacters = string.replace(/[^\w+\s]/gi, '')
    .toLowerCase()
    .split(' ');
    return validCharacters;
  }

  /**
   * getTokens
   * gets an array of tokens from a string
   * @param {String} string string to generate token from
   * @return {Array} an array of generated token
   */

  static getTokens(string) {
    const tokens = this.cleanString(string);
    return Array.from(new Set(tokens));
  }

  /**
   * validateData
   * Reads content of JSON and checks for validity
   * @param {Object} data content of JSON to check for validity
   * @return {Boolean} validity status of the JSON content
   */
  static validateData(data) {
    if (typeof data !== 'object' || data.length === 0) {
      return false;
    }
    try {
      data.forEach((currentDoc) => {
        const hasTitle = currentDoc.title;
        const hasText = currentDoc.text;
        if (!hasTitle && !(hasText)) {
          return false;
        }
      });
      return true;
    } catch (err) {
      return err;
    }
  }
}
