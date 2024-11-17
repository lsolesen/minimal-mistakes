// blog posts
const getPosts = collection => {
  return collection.getFilteredByGlob('docs/_posts/**/*.md');
};

module.exports = {
    getPosts
};
