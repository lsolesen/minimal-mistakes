  // https://saadbess.com/blog/creating-a-content-recommendation-plugin-in-11ty/

const getRelatedPosts = function (collection) {
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
  };
  
  module.exports = {
      getRelatedPosts
  };
  