/* _data/eleventyComputed.js */
const isPageFromFuture = ({ date }) =>
    //process.env.ELEVENTY_ENV === "production" && date.getTime() > Date.now();
    date.getTime() > Date.now();
  
  module.exports = {
    permalink: (data) => {
      const { permalink, page } = data;
      if (isPageFromFuture(page)) return false;
  
      return permalink;
    },
    eleventyExcludeFromCollections: (data) => {
      const { eleventyExcludeFromCollections, page } = data;
      if (isPageFromFuture(page)) return true;
  
      return eleventyExcludeFromCollections;
    },
  };