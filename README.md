# hamdilhasan.dev

Personal website and blog of Hamdil Hasan, built with Python, Pelican, Jinja2, Markdown, HTML, CSS and a small amount of JavaScript.

## What this site is for

- Technical writing and CSE notes
- Personal findings and experiments
- App/software/device reviews
- Robotics and project development logs
- University and life updates
- A public record of learning and building

## Local development

### 1. Create a virtual environment

```bash
python -m venv .venv
```

Windows:

```powershell
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

### 2. Install dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Build the site

```bash
pelican content -s pelicanconf.py
```

The generated website will be in `output/`.

### 4. Preview locally

```bash
pelican --listen -s pelicanconf.py
```

Open http://localhost:8000

### 5. Publish

Push to `main`. GitHub Actions builds Pelican and publishes the site to GitHub Pages.

## Project structure

```text
content/                  # Markdown articles and pages
theme/hamdil/             # Custom Jinja2 theme
static/                   # Files copied directly to the generated site
pelicanconf.py            # Development configuration
publishconf.py            # Production configuration
requirements.txt          # Python dependencies
.github/workflows/         # GitHub Pages deployment
```

## Writing a new article

Create a Markdown file under `content/articles/`.

Example:

```markdown
Title: My New Post
Date: 2026-08-29
Category: Programming
Tags: Python, Learning
Slug: my-new-post
Summary: A short description shown on the homepage.

# My New Post

Write here...
```

## License

The website source is available under the repository license. Your original writing, photography, and other personal content remain yours unless separately licensed.
