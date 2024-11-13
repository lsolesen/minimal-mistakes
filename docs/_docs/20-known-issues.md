---
title: "Known issues"
permalink: /docs/known-issues/
excerpt: "These are known issues with this port of the Minimal Mistakes theme, that does not work correctly."
last_modified_at: 2024-11-12T09:33:35-04:00
---

This is a port of Michael Rose's Jekyll theme. There are still quite a few known issues which hopefully will be improved soon.

Here is a list:

## Does not render en-dash

--- does not render to en-dash

## Where filer does not work

`where` filter does not work. Everytime it is used it just returns en empty collection after filtering.

## Tags and categories pages are not sorted.

Tags page and categories pages are not sorted by most items in the collection.

## No way to render future posts

No way to render future posts. They have been removed in `_data/eleventyComputed.js`

## Pagination is not setup

Pagination not setup.

## Feeds are not automatically created

Feed.xml not created.

## Tags and category pages could probably be improved

Right now there is a lot of room for improvement on the tags and category pages.

## Skin

You have to set skin directly in `css/main.scss`. Found no way where I could just have it in site-configuration.
