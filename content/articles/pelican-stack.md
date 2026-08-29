Title: My Personal Website Stack: Python, Pelican and Markdown
Date: 2026-08-29
Category: Programming
Tags: Python, Pelican, Markdown, Web Development, GitHub
Slug: my-personal-website-stack
Summary: Why I chose a Python static-site generator instead of building a full web application.

# My Personal Website Stack

For a personal blog, I don't need a database, login system or a large backend.

I need a reliable way to write content and turn it into a fast website.

## The stack

```text
Markdown
   ↓
Pelican
   ↓
Jinja2
   ↓
HTML + CSS
   ↓
GitHub Pages
```

Python sits at the center because Pelican is Python-based.

## Why static?

A static website is easy to host, easy to version-control and difficult to accidentally break with a database problem.

Every article is just a Markdown file.

That makes the content portable and transparent.

## Why not Django?

Django is excellent, but it solves a much bigger problem.

If I eventually need accounts, dynamic data, an API or user-generated content, a backend may make sense.

For a personal blog, it would mostly be extra machinery.

## The learning value

The best part is that the site itself becomes a CSE project.

I get to practice:

- Python
- templating
- HTML/CSS
- Git
- CI/CD
- web accessibility
- SEO
- static-site architecture

And I get a website at the end.

That's a good trade.
