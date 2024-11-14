// Prepare to use image transformations
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");

// Setting up Markdownify
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownItFootnote = require("markdown-it-footnote");

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
md.use(markdownItFootnote);

// Allow for data files to be in yaml
const yaml = require("js-yaml");

module.exports = async function (eleventyConfig) {

  // RSS-feed
  eleventyConfig.addPlugin(pluginRss, {
    type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Blog Title",
			subtitle: "This is a longer description about your blog.",
			base: "https://example.com/",
			author: {
				name: "Your Name",
				email: "", // Optional
			}
		}
  });

  // Tags
  eleventyConfig.addCollection('tagList', collection => {
      const tagsSet = new Set();
      collection.getAll().forEach(item => {
          if (!item.data.tags) return;
          item.data.tags.filter(tag => !['posts', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
      });
      return Array.from(tagsSet).sort();
  });

  // Categories
  eleventyConfig.addCollection('categoryList', collection => {
      let catSet = {};
      collection.getAll().forEach(item => {
          if (!item.data.categories) return;
          item.data.categories.filter(
              cat => !['posts', 'all'].includes(cat)
          ).forEach(
              cat => {
                  if (!catSet[cat]) { catSet[cat] = []; }
                  catSet[cat].push(item)
              }
          );
      });
      return catSet;
  });

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

  // Collections
  eleventyConfig.addCollection('posts', function(collection) {
      return collection.getFilteredByGlob('docs/_posts/**/*.md');
  });
  eleventyConfig.addCollection('docs', function(collection) {
      return collection.getFilteredByGlob('docs/_docs/**/*.md');
  });
  eleventyConfig.addCollection('pets', function(collection) {
      return collection.getFilteredByGlob('docs/_pets/**/*.md');
  });
  eleventyConfig.addCollection('recipes', function(collection) {
      return collection.getFilteredByGlob('docs/_recipes/**/*.md');
  });
  eleventyConfig.addCollection('portfolio', function(collection) {
      return collection.getFilteredByGlob('docs/_portfolio/**/*.md');
  });

  // Make it possible to have the site served in a sub directory
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Automatically improve images
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: 'html',
    // optional, output image formats
    formats: ['jpg', 'png', 'webp'],
    // optional, output image widths
    widths: ['auto', 400, 800],
    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      loading: 'lazy',
      sizes: '100vw',
      decoding: 'async',
    },
  });

  // Syntax highlighting with prism
  // TODO Missing copy button
  eleventyConfig.addPlugin(syntaxHighlight);

  // Pass through
  eleventyConfig.addPassthroughCopy("assets/css");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/images/");
  eleventyConfig.addPassthroughCopy({ "docs/assets/images": "assets/images" });

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

  // Configure excerpt
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true
  });

  // Create computed excerpts per page if none has been explicitly set
  eleventyConfig.addGlobalData("eleventyComputed.excerpt", () => (data) => {

    if (JSON.stringify(data) === '{}') {
      return "";
    }

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

  // absolute_url is deprecated - hardcode to your liking
  // @deprecated
  eleventyConfig.addFilter("absolute_url", (url) => {
      return url;
    }
  );

  // Relative url is deprecated
  // @deprecated
  eleventyConfig.addFilter("relative_url", (url) => {
      return url;
    }
  );

  /**
   * Define a post_url Liquid tag for cross-referencing
   * 
   * Original creator: https://rusingh.com/articles/2020/04/24/implement-jekyll-post-url-tag-11ty-shortcode/
   * Adapted by me to work with filename instead of slug.
   * 
   * @param {*} collection 
   * @param {*} filename 
   * @returns 
   */
  eleventyConfig.addShortcode("post_url", (collection, filename) => {
    if (collection.length < 1) {
      throw "Collection appears to be empty";
    }
    if (!Array.isArray(collection)) {
      throw "Collection is an invalid type - it must be an array!";
    }
    if (typeof filename !== "string") {
      throw "Filename is an invalid type - it must be a string!";
    }
    const found = collection.find(p => p.template.inputPath.indexOf(filename) > -1);
    if (found === 0 || found === undefined) {
      // When nothing was found, throw an error to break the build.
      // Broken links should not be allowed!
      throw new Error(`File ${this.page.inputPath} wants to link to ${filename}, but it does not exist.`);
    } else {
      return found.url;
    }
  });

  /**
   * Define a post_url Liquid tag for cross-referencing
   * 
   * Original creator: https://rusingh.com/articles/2020/04/24/implement-jekyll-post-url-tag-11ty-shortcode/
   * Adapted by me to work with filename instead of slug.
   * 
   * @param {*} collection 
   * @param {*} filename 
   * @returns 
   */
  eleventyConfig.addShortcode("link", (collection, filename) => {
    if (collection.length < 1) {
      throw "Collection appears to be empty";
    }
    if (!Array.isArray(collection)) {
      throw "Collection is an invalid type - it must be an array!";
    }
    if (typeof filename !== "string") {
      throw "Filename is an invalid type - it must be a string!";
    }
    const found = collection.find(p => p.template.inputPath.indexOf(filename) > -1);
    if (found === 0 || found === undefined) {
      // When nothing was found, throw an error to break the build.
      // Broken links should not be allowed!
      throw new Error(`File ${this.page.inputPath} wants to link to ${filename}, but it does not exist.`);
    } else {
      return found.url;
    }
  });

  // @source https://24ways.org/2018/turn-jekyll-up-to-eleventy/
  // TODO: Might be better to turn off in the future, but for now this makes i way easier
  eleventyConfig.setLiquidOptions({
    jekyllInclude: true, // allow to use jekyll style include
    extname: ".liquid", // Use .liquid if not specified
    dynamicPartials: false, // allow to use feature_row without quotes
    strictFilters: true
  });

  // Make it possible to use yaml as settings
  eleventyConfig.addDataExtension("yaml, yml", (contents) => yaml.load(contents));

  return {
    dir: {
      input: "./docs",
      includes: "../_includes",
      layouts: "../_layouts",
      htmlTemplateEngine: "liquid",
      dataTemplateEngine: "html",
      output: "_site",
      pathPrefix: "/minimal-mistakes"
    },
  };
};
