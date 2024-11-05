const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

// Collections
const getPosts = collection => {
  return collection.getFilteredByGlob('docs/_posts/**/*.md');
};
const getDocs = collection => {
  return collection.getFilteredByGlob('docs/_docs/**/*.md');
};
const getPets = collection => {
  return collection.getFilteredByGlob('docs/_pets/**/*.md');
};
const getRecipes = collection => {
  return collection.getFilteredByGlob('docs/_recipes/**/*.md');
};
const getPortfolio = collection => {
  return collection.getFilteredByGlob('docs/_portfolio/**/*.md');
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

// https://fossheim.io/writing/posts/eleventy-similar-posts/
const getSimilarCategories = function(categoriesA, categoriesB) {
  return categoriesA.filter(Set.prototype.has, new Set(categoriesB)).length;
}

module.exports = async function(eleventyConfig) {

  // https://saadbess.com/blog/creating-a-content-recommendation-plugin-in-11ty/
  eleventyConfig.addCollection("relatedPosts", function (collection) {
    return collection
      .getAll()
      .filter((item) => !item.data.draft)
      .map((post) => {
        let related = [];

        if (post.data.tags) {
          post.data.tags.forEach((tag) => {
            collection.getFilteredByTag(tag).forEach((item) => {
              if (
                item.url !== post.url &&
                !related.includes(item) &&
                !item.data.draft
              ) {
                related.push(item);
              }
            });
          });
        }
        // Remove duplicates and limit to a specific number of related posts, for instance, 3
        related = [...new Set(related)].slice(0, 4);
        post.data.relatedPosts = related;
        return post;
      });
  });

  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: 'html',
    // optional, output image formats
    formats: ['jpg', 'webp'],
    // optional, output image widths
    widths: ['auto', 400, 800],
    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
        loading: 'lazy',
        sizes: '100vw',
        decoding: 'async',
    },
  });

    // TODO Missing copy button
    // Can be created using this
    eleventyConfig.addPlugin(syntaxHighlight);

    // Collections
    // TODO ADD ALL COLLECTIONS
    eleventyConfig.addCollection('posts', getPosts);
    eleventyConfig.addCollection('docs', getDocs);
    eleventyConfig.addCollection('pets', getPets);
    eleventyConfig.addCollection('recipes', getRecipes);
    eleventyConfig.addCollection('portfolio', getPortfolio);

    // Pass through
    eleventyConfig.addPassthroughCopy("assets/css");
    eleventyConfig.addPassthroughCopy("assets/js");
    eleventyConfig.addPassthroughCopy("assets/images/");
    eleventyConfig.addPassthroughCopy({"docs/assets/images": "assets/images"});

    // Setup shortcodes and filters
    eleventyConfig.setLibrary("md", md);
    eleventyConfig.addFilter("markdownify", (markdownString) =>
        md.render(markdownString),
    );

    // Create titles for posts without a title in frontmatter
    eleventyConfig.addGlobalData("eleventyComputed.title", () => (data) => {
      // If property is explicitly set, use that
      if (data.title) {
        return data.title;
      }

      let slug = data.page.fileSlug;
      let words = slug.split('-');

      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      return words.join(' ');
    });

    // Create computed excerpts per page
    eleventyConfig.addGlobalData("eleventyComputed.excerpt", () => (data) => {
      // If property is explicitly set, use that
      if (data.excerpt) {
        return data.excerpt;
      }

      // Grab raw page content
      let content = data.page.rawInput;

      // If template uses Markdown, render it
      if (data.page.templateSyntax.includes('md')) {
        content = md.render(content);
      }

      // Vanilla paragraphs ending in period, question or exclamation
      const matches = content.match(/<p>(.+[\.\?\!])<\/p>/);

      // If found, return content
      if (matches) {
        return matches[1];
      }

      return null;
    });

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
    eleventyConfig.addShortcode("post_url", (url) => {
      return url;
    });

    // TODO FIX SHORTCODE TO REMOVE COLLECTION BASED STUFF
    eleventyConfig.addShortcode("link", (url) => {
      return url;  
    });

    // @source https://24ways.org/2018/turn-jekyll-up-to-eleventy/
    // TODO: Might be better to turn off in the future, but for now this makes i way easier
    eleventyConfig.setLiquidOptions({
      jekyllInclude: true, // allow to use jekyll style include
      extname: ".liquid", // Use .liquid if not specified
      dynamicPartials: false, // allow to use feature_row without quotes
      //trimTagLeft: true,
      //trimTagRight: false,
      //trimOutputRight: true,
      //trimOutputLeft: false
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
        pathPrefix: "/minimal-mistakes"
      },
    };
};
