export default function (eleventyConfig) {
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
  };
    