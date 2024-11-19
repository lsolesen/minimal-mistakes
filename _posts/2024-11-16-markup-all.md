---
title: "Markup: All markup"
excerpt: "Post displaying the various ways of marking up code in Markdown."
last_modified_at: 2024-01-03T09:45:06-05:00
header:
  teaser: "/assets/images/markup-syntax-highlighting-teaser.jpg"
tags: 
  - markdown
toc: true
---

A lot of markdown packages are installed to help you write your posts.
You can configure them in `config/plugins/markdown.js`.

## h2 Heading

### h3 Heading

#### h4 Heading

Muffin bonbon jujubes cheesecake chupa chups shortbread ice cream cotton candy cake. Jelly-o biscuit dessert danish dessert pastry tootsie roll lemon drops gingerbread. Cheesecake donut marzipan sweet roll icing muffin halvah. Dragée donut cake biscuit pie carrot cake sesame snaps jelly-o gummi bears.

Soufflé topping shortbread lemon.

## hr

---

## Typographic replacements

**The replacement converts this input:**

```markdown
(c) (C) (r) (R) (tm) (TM) +-
and so on.. and so on... and so on..... AND SO ON???????.....
WTF!!!!!! How many exclamation marks are you going to use????????????
,, -- ---
"double quotes" and 'single quotes'
```

**To this:**

(c) (C) (r) (R) (tm) (TM) +-
and so on.. and so on... and so on..... AND SO ON???????.....
WTF!!!!!! How many exclamation marks are you going to use????????????
,, -- ---
"double quotes" and 'single quotes'

## Emphasis

**This is bold text**
_This is italic text_
~~Strikethrough~~

## Blockquote

> Cheesecake donut marzipan sweet roll icing muffin halvah. Dragée donut cake biscuit pie carrot cake sesame snaps jelly-o gummi bears. Cotton candy cookie croissant fruitcake.

## Lists

### Unordered lists

- Create a list by starting a line with `+`, `-`, or `*`
- Another item

### Ordered lists

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

## Code

Syntax highlighting

```css
.back-top-top {
  padding: 10px;
  background: white;
  margin-top: 110vh;
  position: sticky;
  bottom: 0;
}

/* by David Darnes */
```

## Tables

| Technology | Fun fact                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML       | HTML (Hypertext Markup Language) was created by Sir Tim Berners-Lee in 1991 as a way to structure and link documents on the World Wide Web. |
| CSS        | It's called "cascading" because styles can cascade down from parent elements to their children, allowing for inheritance and overriding.    |
| JavaScript | TypeError: null is not an object                                                                                                            |

## Links

[Read all those articles](https://moderncss.dev/)
Autoconverted link https://every-layout.dev/ (enabled via linkify)

## Emojis

**Literal:**
🤩 💯 💚 👻 👾

**Classic markup:**
:cry: :poop: :fire: :laughing: :christmas_tree:
([A reference for emoji markup](https://gist.github.com/rxaviers/7360908))

**Shortcuts (emoticons)**:
:-) :-( 8-) ;) :-P

## mark

==Marked text==

## Footnotes

Footnote 1 link[^first].
Footnote 2 link[^second].

[^first]:
    Footnote **can have markup**
    and multiple paragraphs.

[^second]: Footnote text.

\*[HTML]: Hyper Text Markup Language
