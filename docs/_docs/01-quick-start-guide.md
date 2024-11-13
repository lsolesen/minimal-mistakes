---
title: "Quick-Start Guide"
permalink: /docs/quick-start-guide/
excerpt: "How to quickly install and setup Minimal Mistakes for use with GitHub Pages."
last_modified_at: 2021-06-07T08:48:05-04:00
redirect_from:
  - /theme-setup/
toc: true
---

Minimal Mistakes has been developed by Michael Rose for Jekyll. This is a port to use with 11ty. You can deploy it to Github Pages with Github Actions.

You can sponsor Michael Rose on the links below.

**If you enjoy this theme, please consider [sponsoring me](https://github.com/sponsors/mmistakes) to continue developing and maintaining it.**

[!["Buy Me A Coffee"](https://user-images.githubusercontent.com/1376749/120938564-50c59780-c6e1-11eb-814f-22a0399623c5.png)](https://www.buymeacoffee.com/mmistakes)

[![Support via PayPal](https://cdn.jsdelivr.net/gh/twolfson/paypal-github-button@1.0.0/dist/button.svg)](https://www.paypal.me/mmistakes)
{: style="margin-top: 0.5em;"}

## Installing the theme

You clone this repository, and then you are ready to add your own spin to the template.

[^structure]: See [**Structure** page]({{ "/docs/structure/" | relative_url }}) for a list of theme files and what they do.

**ProTip:** Be sure to remove `/docs` and `/test` if you forked Minimal Mistakes. These folders contain documentation and test pages for the theme and you probably don't want them littering up your repo.
{: .notice--info}

## NOT UPDATED FURTER

**Looking for an example?** Use the [Minimal Mistakes remote theme starter](https://github.com/mmistakes/mm-github-pages-starter/generate) for the quickest method of getting a GitHub Pages hosted site up and running. Generate a new repository from the starter, replace sample content with your own, and configure as needed.
{: .notice--info}

---

**Note:** Your site should be viewable immediately at <http://USERNAME.github.io>. If it's not, you can force a rebuild by **Customizing Your Site** (see below for more details).
{: .notice--warning}

If you're hosting several sites under the same GitHub username you will have to use Project Pages instead of User Pages. Essentially you rename the repo to something other than **USERNAME.github.io** and create a `gh-pages` branch off of `master`. For more details on how to set things up check [GitHub's documentation](https://help.github.com/articles/user-organization-and-project-pages/).

<figure>
  <img src="{{ '/assets/images/mm-gh-pages.gif' | relative_url }}" alt="creating a new branch on GitHub">
</figure>

You can also install the theme by copying all of the theme files[^structure] into your project.

To do so fork the [Minimal Mistakes theme](https://github.com/mmistakes/minimal-mistakes/fork), then rename the repo to **USERNAME.github.io** --- replacing **USERNAME** with your GitHub username.

<figure>
  <img src="{{ '/assets/images/mm-theme-fork-repo.png' | relative_url }}" alt="fork Minimal Mistakes">
</figure>

### Remove the Unnecessary

If you forked or downloaded the `minimal-mistakes-11ty` repo you can safely remove the following folders and files:

- `.editorconfig`
- `.gitattributes`
- `.github`
- `/docs`
- `/test`
- `CHANGELOG.md`
- `README.md`
- `screenshot-layouts.png`
- `screenshot.png`

## Setup Your Site

Depending on the path you took installing Minimal Mistakes you'll setup things a little differently.

**ProTip:** The source code and content files for this site can be found in the [`/docs` folder](https://github.com/mmistakes/minimal-mistakes/tree/master/docs) if you want to copy or learn from them.
{: .notice--info}

### Starting Fresh

Starting with an empty folder you need to copy the entire contents of the repository to get started. 

For a full explanation of every setting be sure to read the [**Configuration**]({{ "/docs/configuration/" | relative_url }}) section.

If you're hosting on GitHub Pages, you can copy the [`_data/ui-text.yml`][ui-text.yml] file into your repository for the localization feature to work.

You'll need to create and edit these data files to customize them:

- [`_data/site.yml`][site.yml] - UI text [documentation]({{ "/docs/configuration/" | relative_url }})
- [`_data/ui-text.yml`][ui-text.yml] - UI text [documentation]({{ "/docs/ui-text/" | relative_url }})
- [`_data/navigation.yml`][navigation.yml] - navigation [documentation]({{ "/docs/navigation/" | relative_url }})

  [site.yml]: https://github.com/mmistakes/minimal-mistakes/blob/master/_data/site.yml
  [ui-text.yml]: https://github.com/mmistakes/minimal-mistakes/blob/master/_data/ui-text.yml
  [navigation.yml]: https://github.com/mmistakes/minimal-mistakes/blob/master/_data/navigation.yml

Then you might want to clear out some of the stuff in the repository.

```
├── docs (clear out everything)
```

**Note:** When clearing out the `assets` folder be sure to leave any files you've added and need. This includes images, CSS, or JavaScript that aren't already [bundled in the theme](https://github.com/mmistakes/minimal-mistakes/tree/master/assets). 
{: .notice--warning}

---

That's it! If all goes well the following should spin-up your site:

```bash
npm run watch:eleventy
npm run watch:sass
```
