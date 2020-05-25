const findValue = (obj, key) => {
  let result;

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (property === key) {
        return obj[key];
      } else if (typeof obj[property] === 'object') {
        result = findValue(obj[property], key);

        if (typeof result !== 'undefined') {
          return result;
        }
      }
    }
  }
};

module.exports = {
  findValue
};
