// blog posts
export const getPosts = collection => {
  return collection.getFilteredByGlob('docs/_posts/**/*.md');
};
