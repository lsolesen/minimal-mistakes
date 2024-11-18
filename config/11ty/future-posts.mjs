/* _data/eleventyComputed.js */
const isPageFromFuture = ({ date }) =>
  process.env.ELEVENTY_RUN_MODE === "build" && date.getTime() > Date.now();
const POST_DATE_RE = /(?<prefix>^.*\/)(?<date>\d{4}-(?:[0]\d|1[0-2])-(?:[0-2]\d|3[01]))-(?<suffix>.+)/;
    
export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("eleventyComputed.permalink", () => {
    return (data) => {
      const { permalink, page } = data;
      if (isPageFromFuture(page)) return false;
  
      return permalink;
    }
  });
  eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
    return (data) => {
      const { eleventyExcludeFromCollections, page } = data;
      if (isPageFromFuture(page)) return true;
  
      return eleventyExcludeFromCollections;
    }
  });
};
