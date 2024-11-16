// blog posts
const getPosts = collection => {
  return collection.getFilteredByGlob('docs/_posts/**/*.md');
};
// docs
const getDocs = collection => {
  return collection.getFilteredByGlob('docs/_docs/**/*.md');
};
// pets
const getPets = collection => {
  return collection.getFilteredByGlob('docs/_/pets/**/*.md');
};
// recipes
const getRecipes = collection => {
  return collection.getFilteredByGlob('docs/_/recipes/**/*.md');
};  
// recipes
const getPortfolio = collection => {
  return collection.getFilteredByGlob('docs/_/portfolio/**/*.md');
};  

module.exports = {
    getPosts,
    getDocs,
    getPets,
    getRecipes,
    getPortfolio
};
