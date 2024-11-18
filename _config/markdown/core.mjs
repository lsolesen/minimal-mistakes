// Setting up Markdownify
import markdownIt from "markdown-it";
import markdownItAttrs from 'markdown-it-attrs';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItFootnote from "markdown-it-footnote";

import markdownitAbbr from 'markdown-it-abbr';
import markdownitMark from 'markdown-it-mark';
import { full as markdownItEmoji } from 'markdown-it-emoji'
import markdownItPrism from 'markdown-it-prism';

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

md.use(markdownItEmoji);
md.use(markdownitMark);
md.use(markdownitAbbr);

export default md;
