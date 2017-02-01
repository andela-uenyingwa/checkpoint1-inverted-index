/**
 * @class InvertedIndexUtilities
 */
class InvertedIndexUtilities {

  /**
   * getToken
   * gets an array of tokens from a string
   * @param {String} string string to generate token from
   * @return {Object} an array of generated token
   */
  static getToken(string) {
    const badValues = /[^a-zA-Z0-9\s]/g;
    const tokens = string.replace(badValues, ' ')
      .toLowerCase().split(' ')
      .filter(text =>
        text
      );
    return tokens;
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
        const hasTitle = Object.prototype.hasOwnProperty
          .call(currentDoc, 'title');
        const hasText = Object.prototype.hasOwnProperty
          .call(currentDoc, 'text');
        if (!hasTitle || !(hasText)) {
          return false;
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}

