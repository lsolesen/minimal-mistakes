// Setting up Markdownify
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
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

module.exports = md;
