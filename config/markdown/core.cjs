// Setting up Markdownify
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootnote = require("markdown-it-footnote");

const markdownitAbbr = require('markdown-it-abbr');
const markdownitMark = require('markdown-it-mark');
//const markdownItEmoji = require("markdown-it-emoji");
const markdownItPrism = require ('markdown-it-prism');

let markdownitOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
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

md.disable('code');
md.use(markdownItPrism, {
  defaultLanguage: 'plaintext'
});

//md.use(markdownItEmoji);
md.use(markdownitMark);
md.use(markdownitAbbr);

module.exports = md;
