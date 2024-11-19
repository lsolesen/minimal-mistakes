---
title: "Post: Future Date"
date: 9999-12-31
categories:
  - Post
---

This post lives in the future and is dated {{ page.date | date: "%c" }}. 

This should be hidden when building via `build`, but be shown in `watch` and development mode.