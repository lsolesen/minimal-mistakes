---
title: "Working with Pages"
permalink: /docs/pages/
excerpt: "Suggestions and Front Matter defaults for working with pages."
last_modified_at: 2016-11-03T11:13:12-04:00
---

To better organize all of your pages you can centralize them into a single location similar to posts and collections.

**Step 1:** Start by placing pages (`.md` or `.html` files) into a `_pages` directory. Meaningfully naming files should be the goal. Avoid patterns like `/about/index.md` as it makes distinguishing between multiple `index.md` files harder.

```bash
sample-project
└── _pages/
    ├── 404.md               # custom 404 page
    ├── about.md             # about page
    └── contact.md           # contact page
```

**Step 2:** Assign permalink overrides in the YAML Front Matter of each.

Examples:

| filename            | permalink              |
| --------            | ---------              |
| _pages/about.md     | `permalink: /about/`   |
| _pages/home.md      | `permalink: /`         |
| _pages/contact.md   | `permalink: /contact/` |

**Recommended Front Matter Defaults:**

```yaml
defaults:
  # _pages
  - scope:
      path: ""
      type: pages
    values:
      layout: single
      author_profile: true
```