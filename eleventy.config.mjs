import mainConfig from './config/mainConfig.mjs';
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

// Custom collections
const getDocs = collection => {
  return collection.getFilteredByGlob('docs/_docs/**/*.md');
};
const getPets = collection => {
  return collection.getFilteredByGlob('docs/_/pets/**/*.md');
};
const getRecipes = collection => {
  return collection.getFilteredByGlob('docs/_/recipes/**/*.md');
};  
const getPortfolio = collection => {
  return collection.getFilteredByGlob('docs/_/portfolio/**/*.md');
};

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
		}
  });

  // Custom Collections
  eleventyConfig.addCollection('docs', getDocs);
  eleventyConfig.addCollection('pets', getPets);
  eleventyConfig.addCollection('recipes', getRecipes);
  eleventyConfig.addCollection('portfolio', getPortfolio);

  // Pass through
  eleventyConfig.addPassthroughCopy("assets/css");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/images/");
  eleventyConfig.addPassthroughCopy({ "docs/assets/images": "assets/images" });

  // USE if you want to override one of the layouts and use your own version
  // eleventyConfig.addLayoutAlias("single", "../_layouts/splash.html");

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
