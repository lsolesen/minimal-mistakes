---
title: "Installation"
permalink: /docs/installation/
excerpt: "Instructions for installing the theme for new and existing 11ty based sites."
last_modified_at: 2019-08-20T21:36:18-04:00
toc: true
---

## Installation

Minimal Mistakes requires [11ty](http://www.11ty.dev) 3.0. Make sure to run `npm install` if you aren't on the latest version to update all dependencies.

If you are creating a new 11ty site using Minimal Mistakes follow these steps:

1. Fork the [Minimal Mistakes repo](http://github.com/lsolesen/minimal-mistakes/fork).
2. Clone the repo you just forked and rename it.
3. Install node and run `npm install` to install all dependencies.
4. Update `_data/site.yml`, `_data/navigation.yml`, and replace demo posts and pages with your own. Full details below.
5. Update `eleventy.js` and add your collections. Full details below.

If you want to use Minimal Mistakes with an existing 11ty site follow these steps:

1. [Download Minimal Mistakes](https://github.com/lsolesen/minimal-mistakes/releases/tag/) in the version, you want, and unzip.
2. Rename `minimal-mistakes-master` to something meaningful ie: `new-site`
3. Run `npm install` to install all dependencies.
4. Remove demo posts/pages and replace with your own posts, pages, and any other content you want to move over.
5. Update posts' and pages' YAML to match variables used by Minimal Mistakes. Full details below.
6. Update `_data/site.yml`, `_data/navigation.yml`, and replace demo posts and pages with your own. Full details below.
7. Update `eleventy.js` and add your collections. Full details below.

**Pro-tip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo site that I'm guessing you won't want.
{: .notice}

[<i class="fas fa-download"></i> Download Minimal Mistakes Theme](https://github.com/mmistakes/minimal-mistakes/archive/master.zip){: .btn .btn--success}

**ProTip:** Be sure to remove `/docs` and `/test` if you forked or downloaded Minimal Mistakes. These folders contain documentation and test pages for the theme and you probably don't want them littering up in your repo.
{: .notice--info}

## Theme migration

To move over any existing content you'll want to copy the contents of your `_posts` folder to the new site. Along with any pages, collections, data files, images, or other assets you may have.

Next you'll need to convert posts and pages to use the proper layouts and settings. In most cases you simply need to update `_data/site.yml` to your liking and set the correct `layout` in their YAML Front Matter.

[**Front Matter defaults**](https://www.11ty.dev/docs/data-template-dir/) are your friend and I encourage you to leverage them instead of setting a layout and other global options in each post/page's YAML Front Matter.

Posts can be configured to use the `single` layout --- with reading time, comments, social sharing links, and related posts enabled.

Adding the data file for the collection, e.g. `_posts/_posts.json` will set these defaults for all posts in that directory:

```json
{
  "layout": "single",
  "read_time": true,
  "comments": true,
  "share": true,
  "related": true
}
```

**Post/Page Settings**: Be sure to read through the "Working with..." documentation to learn about all the options available to you. The theme has been designed to be flexible --- with numerous settings for each.
{: .notice--info}

## Install dependencies

If this is your first time using 11ty be sure to read through the [official documentation](https://www.11ty.dev/) before jumping in. This guide assumes you have Node and npm installed and a basic understanding of how 11ty works.

To keep your sanity and better manage dependencies I strongly urge you to use `package.json` to handle all dependencies.

Doing so executes the npm versions specified in `package-lock.json`, when running `npm run watch:eleventy`.