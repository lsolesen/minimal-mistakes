const where = function (array, key, value) {
    return array.filter(item => {
      let itemValue;
      
      // Check if the key is in item.data
      if (item.data && key in item.data) {
        itemValue = item.data[key];
      } 
      // Check if the key is directly in item
      else if (key in item) {
        itemValue = item[key];
      } 
      // If key is not found, return false to filter out this item
      else {
        return false;
      }

      // Handle undefined value (check for key existence)
      if (typeof value === 'undefined') {
        return true;
      }

      // Handle array values
      if (Array.isArray(itemValue)) {
        return itemValue.includes(value);
      } 
      // Handle string and other types
      else {
        return itemValue === value;
      }
    });
  }

  module.exports = {
    where
  };