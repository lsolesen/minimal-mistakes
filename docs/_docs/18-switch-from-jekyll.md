---
title: "Switch from Minimal Mistakes on Jekyll"
permalink: /docs/switch-from-jekyll/
excerpt: "Instructions for switching from Minimal Mistakes on Jekyll to the 11ty port."
---

If you like the Minimal Mistakes theme, but want to use it with 11ty. This is your chance.

There a couple of things you need to do to get everything working.

## Steps

These are the steps I identified so far, but they may not be enough. Upgrades are on your own risk.

1. Make a new branch in your repository, e.g. `11ty`.
2. Add dependencies for you `package.json`. Checkout the original `package.json` for what to add.
3. Rename `_layouts` and `_includes` to `_layouts_old` and `_includes_old`.
4. Add files to ignore to `.eleventyignore`. You can see them in your current Jekyll `_config.yml` under the `ignore`-tag.
5. Move `_config.yml` to `_data/site.yml`.
6. In `.eleventy.js` create collections of all your collections, e.g. `_posts`, `_pages` etc. See an example in the current file.
7. Add data files for the directories for your defaults. E.g. `_posts/_posts.json` and similar files to all of your collections to provide frontmatter defaults. You can see your current setup under defaults in your Jekyll `_config.yml`.
8. All `link` and `post_url` you used in your current site, has to be rewritten to {% raw %}`{% link collections.posts, "_filename.md" %}`{% endraw %}. You need to create a collection with the possible filenames, and you need to "" around the `_filename.md`. You might be able to just use collections.all, but that is untested.
9. Do search and replace on `site.posts` and other collections and replace it with `collections.posts` and the like.
10. If you use `id=""` with `gallery` or `feature_row`, then you need to rewrite the frontmatter to `feature_rows` and `galleries` and put the specific id in the frontematter under that tag.
11. Do a search and replace on `page.` and replace it with nothing `""`;
12. Rewrite `css/main.scss`. This is also where you have to set your theme directly if you want to change it.

Remove the dashes in the top of the file. If you added content below these lines, keep it. Add `../../_sass/` before minimal-mistakes.

Like this:

```
@import "../../_sass/minimal-mistakes/skins/default"; // skin
@import "../../_sass/minimal-mistakes"; // main partials
```

13. Go through the `.eleventy.js`-file. In the bottom change `input`, `includes`, `layouts` to the proper directories compared to your setup.

There might be more things you need to do. Follow the prompt.
