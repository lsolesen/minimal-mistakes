---
title: "Overriding Theme Defaults"
permalink: /docs/overriding-theme-defaults/
excerpt: "Instructions on how to customize the theme's default set of layouts, includes, and stylesheets when using the Ruby Gem version."
last_modified_at: 2020-07-27
---

In Jekyll there is a way to override your files, when using remote theme or the Gemified theme. You do not have the same option in 11ty.

Here you have to edit the files directly.

Each of these files can be modified, but you'll need to copy the default version into your project first. For example, if you wanted to modify the default [`single` layout](https://github.com/mmistakes/minimal-mistakes/blob/master/_layouts/single.html), you'd start by copying it to `_layouts/single.html`.

So basically when editing the files, you are overriding the theme defaults.