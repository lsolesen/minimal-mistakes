/* _data/eleventyComputed.js */
const isPageFromFuture = ({ date }) =>
  process.env.ELEVENTY_RUN_MODE === "build" && date.getTime() > Date.now();
const POST_DATE_RE = /(?<prefix>^.*\/)(?<date>\d{4}-(?:[0]\d|1[0-2])-(?:[0-2]\d|3[01]))-(?<suffix>.+)/;
    
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
    date({ datePublished, page }) {
      if (page.date) {
        return page.date;
      }
      const { date } = page.inputPath?.match(POST_DATE_RE)?.groups ?? {};
      if (!datePublished && date)
        return new Date(date);
      else
        return datePublished;
    },
};