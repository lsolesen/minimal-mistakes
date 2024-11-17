// Prepare to use image transformations
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

// Collections
const { getPosts } = require('./config/11ty/collections.js');
const { getDocs, getPortfolio, getPets, getRecipes } = require('./config/11ty/collections-custom.js');
const { getRelatedPosts } = require('./config/11ty/related-posts.js');
const { getCategoryList } = require('./config/11ty/categories.js');
const { getTagList } = require('./config/11ty/tags.js');

// Markdown
const md = require('./config/markdown/core.js');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Shortcodes
const { postUrl, link } = require("./config/11ty/shortcodes.js");

// Filters
const { where } = require('./config/11ty/filters.js');

// Future posts
const futurePosts = require('./config/11ty/future-posts.js');

// Excerpt and title in eleventyComputed
const eleventyComputedTitle = require('./config/11ty/title.js');

// Allow for data files to be in yaml
const yaml = require("js-yaml");

module.exports = async function (eleventyConfig) {

  // Make it possible to have the site served in a sub directory
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // RSS-feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss", // 'atom' or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 0,     // 0 means no limit
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
  eleventyConfig.addCollection('tagList', getTagList);

  // Categories
  eleventyConfig.addCollection('categoryList', getCategoryList);

  eleventyConfig.addCollection("relatedPosts", getRelatedPosts);

  // Collections
  eleventyConfig.addCollection('posts', getPosts);

  // Custom Collections
  eleventyConfig.addCollection('docs', getDocs);
  eleventyConfig.addCollection('pets', getPets);
  eleventyConfig.addCollection('recipes', getRecipes);
  eleventyConfig.addCollection('portfolio', getPortfolio);

  // Hide future posts in build
  eleventyConfig.addPlugin(futurePosts);

  // Handle drafts
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

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

  // Pass through
  eleventyConfig.addPassthroughCopy("assets/css");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/images/");
  eleventyConfig.addPassthroughCopy({ "docs/assets/images": "assets/images" });

  // Setup Mardown
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdownify", (markdownString) =>
    md.render(markdownString),
  );

  // @source https://24ways.org/2018/turn-jekyll-up-to-eleventy/
  // TODO: Might be better to turn off in the future, but for now this makes i way easier
  eleventyConfig.setLiquidOptions({
    jekyllInclude: true, // allow to use jekyll style include
    extname: ".liquid", // Use .liquid if not specified
    dynamicPartials: false, // allow to use feature_row without quotes
    strictFilters: true
  });

  // Syntax highlighting with prism
  // TODO Missing copy button
  eleventyConfig.addPlugin(syntaxHighlight);

  // Handle titles for posts without a title
  eleventyConfig.addPlugin(eleventyComputedTitle);

  // Configure excerpt
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

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true
  });

  // Setups filters
  eleventyConfig.addFilter('where2', where);

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

  // Short codes
  eleventyConfig.addShortcode("post_url", postUrl);
  eleventyConfig.addShortcode("link", link);

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
