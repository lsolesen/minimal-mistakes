// Prepare to use image transformations
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

// Collections
import { getRelatedPosts } from './11ty/related-posts.mjs';
import { getCategoryList } from './11ty/categories.mjs';
import { getTagList } from './11ty/tags.mjs';

// Markdown
import md from './markdown/core.mjs';
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

// Shortcodes
import { postUrl, link } from "./11ty/shortcodes.mjs";

// Future posts
import futurePosts from './11ty/future-posts.mjs';

// Excerpt and title in eleventyComputed
import eleventyComputedTitle from './11ty/title.mjs';

// Allow for data files to be in yaml
import yaml from "js-yaml";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {

  // Make it possible to have the site served in a sub directory
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Tags
  eleventyConfig.addCollection('tagList', getTagList);

  // Categories
  eleventyConfig.addCollection('categoryList', getCategoryList);

  // Related posts
  eleventyConfig.addCollection("relatedPosts", getRelatedPosts);

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

  // Setup Mardown
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdownify", (markdownString) =>
    md.render(markdownString),
  );

  // This is for making the transition from Jekyll easier.
  // @source https://24ways.org/2018/turn-jekyll-up-to-eleventy/
  // TODO: Might be better to turn off in the future, but for now this makes i way easier
  eleventyConfig.setLiquidOptions({
    jekyllInclude: true, // allow to use jekyll style include
    extname: ".liquid", // Use .liquid if not specified
    dynamicPartials: false, // allow to use feature_row without quotes
    strictFilters: true,
    jekyllWhere: true
  });

  // Syntax highlighting with prism
  // TODO Missing copy button
  eleventyConfig.addPlugin(syntaxHighlight);

  // Handle titles for posts without a title
  eleventyConfig.addPlugin(eleventyComputedTitle);

  // Configure excerpt
  // Create computed excerpts per page if none has been explicitly set
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

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true
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

  // Short codes
  eleventyConfig.addShortcode("post_url", postUrl);
  eleventyConfig.addShortcode("link", link);

  // Make it possible to use yaml as settings
  eleventyConfig.addDataExtension("yaml, yml", (contents) => yaml.load(contents));
};
