'use strict';

// Import main config
import mainConfig from './_config/mainConfig.mjs';

// Rss feed has options to set
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

// Main config
export default async function (eleventyConfig) {

  // Main config is here
  eleventyConfig.addPlugin(mainConfig);

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
		},
    htmlBasePluginOptions: {
      baseHref: '',
    }
  });

  // Collections
  eleventyConfig.addCollection('posts', function(collection) {
    return collection.getFilteredByGlob('_posts/**/*.md');
  });

  // Custom Collections
  eleventyConfig.addCollection('docs', function(collection) {
    return collection.getFilteredByGlob('_docs/**/*.md');
  });
  eleventyConfig.addCollection('pets', function(collection) {
    return collection.getFilteredByGlob('_/pets/**/*.md');
  });
  eleventyConfig.addCollection('recipes', function(collection) {
    return collection.getFilteredByGlob('_/recipes/**/*.md');
  });
  eleventyConfig.addCollection('portfolio', function(collection){
    return collection.getFilteredByGlob('_/portfolio/**/*.md');
  });

  // Pass through
  eleventyConfig.addPassthroughCopy("assets/css");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/images");

  // USE if you want to override one of the layouts and use your own version
  // eleventyConfig.addLayoutAlias("single", "../_layouts/splash.html");

  // Edit the files below. If you have your files in the root directory it should look like this:
  return {
    dir: {
      input: "./",
      includes: "_includes",
      layouts: "_layouts",
      htmlTemplateEngine: "liquid",
      dataTemplateEngine: "html",
      output: "_site"
    },
  };
};
