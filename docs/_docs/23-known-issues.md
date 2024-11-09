
Add files to ignore to .eleventyignore. You can see them in your _config.yml.

Copy _config.yml to _data as site.yml.

You need to create collections for all of collections, like _posts, _pages etc. Do that in .eleventy.js

Add a _posts.json and similar files to all of your collections to provide frontmatter defaults. You have them right now in your _config.yml.

link and post_url has to be rewritten to {% link collections.posts, "_filename.md" %}. You need to create a collection with the possible filenames, and you need to "" around the _filename.md. You might be able to just use collections.all.

If you use id="" with gallery or feature_row, then you need to rewrite the frontmatter to feature_rows and galleries and put the id under that.

Do search and replace on site.posts and other collections and replace it with collections.posts and the like.

 has to be removed.

## Known issues

--- does not render to en-dash

where filter does not work

tags page and categories pages are not sorted by most items in the collection.