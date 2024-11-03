// Collections
const getPosts = collection => {
  return collection.getFilteredByGlob('docs/_posts/**/*.md');
};
const getDocs = collection => {
  return collection.getFilteredByGlob('docs/_docs/**/*.md');
};

// Setting up Markdownify
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

let markdownitOptions = {
  html: true,
  breaks: true,
  linkify: true,
};
const md = new markdownIt(markdownitOptions);

md.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: ["class", "rel"]  // empty array = all attributes are allowed
});
md.use(markdownItAnchor);

// Allow for data files to be in yaml
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {

    // TODO Missing copy button
    // Can be created using this
    eleventyConfig.addPlugin(syntaxHighlight);

    // Collections
    // TODO ADD ALL COLLECTIONS
    eleventyConfig.addCollection('posts', getPosts);
    eleventyConfig.addCollection('docs', getDocs);

    // Pass through
    eleventyConfig.addPassthroughCopy("assets/css");
    eleventyConfig.addPassthroughCopy("assets/js");
    eleventyConfig.addPassthroughCopy("assets/images/");
    eleventyConfig.addPassthroughCopy("docs/assets/images/", "assets/images");

    // Setup shortcodes and filters
    eleventyConfig.setLibrary("md", md);
    eleventyConfig.addFilter("markdownify", (markdownString) =>
        md.render(markdownString),
    );

    // TODO FIX SHORTCODE TO REMOVE COLLECTION BASED STUFF
    eleventyConfig.addFilter("absolute_url", (url) =>
      url,
    );

    // TODO FIX SHORTCODE TO REMOVE COLLECTION BASED STUFF
    eleventyConfig.addFilter("relative_url", (url) =>
      url,
    );

    // @source https://24ways.org/2018/turn-jekyll-up-to-eleventy/
    // {{ array | where: key,value }}
    /*
    eleventyConfig.addFilter('where', function (array, key, value) {
      return array.filter(item => {
        const keys = key.split('.');
        const reducedKey = keys.reduce((object, key) => {
          return object[key];
        }, item);

        return (reducedKey === value ? item : false);
      });
    });
    */

    // TODO FIX SHORTCODE TO REMOVE COLLECTION BASED STUFF
    eleventyConfig.addShortcode("post_url", (slug) => {
      try {
        if (typeof slug !== "string")
          throw "Slug is an invalid type - it must be a string!";
  
        const found = collections.all.find((p) => p.fileSlug.includes(slug));
        if (found === 0 || found === undefined)
          throw `${slug} not found in specified collection.`;
        else return found.url;
      } catch (e) {
        console.error(
          `An error occured while searching for the url to ${slug}. Details:`,
          e
        );
      }
    });

    // TODO FIX SHORTCODE TO REMOVE COLLECTION BASED STUFF
    eleventyConfig.addShortcode("link", (slug) => {
      try {
        if (typeof slug !== "string")
          throw "Slug is an invalid type - it must be a string!";
  
        const found = collections.all.find((p) => p.fileSlug.includes(slug));
        if (found === 0 || found === undefined)
          throw `${slug} not found in specified collection.`;
        else return found.url;
      } catch (e) {
        console.error(
          `An error occured while searching for the url to ${slug}. Details:`,
          e
        );
      }
    });

    // @source https://24ways.org/2018/turn-jekyll-up-to-eleventy/
    // TODO: Might be better to turn off in the future, but for now this makes i way easier
    eleventyConfig.setLiquidOptions({
      jekyllInclude: true,
      extname: "" // Do not require an ext-name
    });

    eleventyConfig.addDataExtension("yaml, yml", (contents) => yaml.load(contents));
    
    // eleventyConfig.addLayoutAlias('default', '_layouts/default.html')
    // eleventyConfig.addLayoutAlias('single', '_layouts/single.liquid')
    // eleventyConfig.addLayoutAlias('archive', 'archive.html')

    // Configure excerpt
    eleventyConfig.setFrontMatterParsingOptions({
      excerpt: true
    });

    return {
      dir: {
        input: "docs",
        includes: "../_includes",
        layouts: "../_layouts",
        htmlTemplateEngine: "liquid",
        dataTemplateEngine: "html",
        output: "_site",
      },
    };
};
