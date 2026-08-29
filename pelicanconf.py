AUTHOR = "Hamdil Hasan"
SITENAME = "Hamdil Hasan"
SITESUBTITLE = "CSE student • developer • explorer"
SITEURL = ""

PATH = "content"
OUTPUT_PATH = "output/"

TIMEZONE = "Asia/Dhaka"
DEFAULT_LANG = "en"
DEFAULT_DATE_FORMAT = "%B %d, %Y"

# Content structure
ARTICLE_PATHS = ["articles"]
PAGE_PATHS = ["pages"]
STATIC_PATHS = ["images", "extra"]
ARTICLE_URL = "blog/{slug}/"
ARTICLE_SAVE_AS = "blog/{slug}/index.html"
PAGE_URL = "{slug}/"
PAGE_SAVE_AS = "{slug}/index.html"
PAGE_URL = "{slug}/"
DIRECT_TEMPLATES = ["index", "categories", "authors", "tags"]
CATEGORY_URL = "category/{slug}/"
CATEGORY_SAVE_AS = "category/{slug}/index.html"
TAG_URL = "tag/{slug}/"
TAG_SAVE_AS = "tag/{slug}/index.html"
ARCHIVES_SAVE_AS = "blog/archive/index.html"

# Theme
THEME = "theme/hamdil"

# Homepage
DIRECT_TEMPLATES = ["index", "categories", "authors", "tags"]
PAGINATED_DIRECT_TEMPLATES = ["index"]

# Feed configuration
FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = "feeds/{slug}.atom.xml"
TAG_FEED_ATOM = "feeds/tag-{slug}.atom.xml"
FEED_MAX_ITEMS = 20

# Markdown
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.toc": {},
        "markdown.extensions.extra": {},
        "markdown.extensions.codehilite": {
            "css_class": "highlight",
            "guess_lang": False,
        },
        "markdown.extensions.meta": {},
    },
    "output_format": "html5",
}

# Metadata
DEFAULT_CATEGORY = "Notes"
DEFAULT_PAGINATION = 8
SHOW_ARTICLE_AUTHOR = True
SHOW_ARTICLE_CATEGORY = True
DISPLAY_CATEGORIES_ON_MENU = False
DISPLAY_PAGES_ON_MENU = False

# Theme context
JINJA_GLOBALS = {"current_year": 2026}

JINJA_ENVIRONMENT = {
    "trim_blocks": True,
    "lstrip_blocks": True,
}

THEME_STATIC_PATHS = ["static"]
STATIC_PATHS = ["images", "extra"]

# Plugins
PLUGINS = []

# Don't copy these
IGNORE_FILES = [".#*", "*~"]

# Custom variables used by the theme
SITE_AUTHOR = "Hamdil Hasan"
SITE_DESCRIPTION = (
    "Personal website of Hamdil Hasan — a CSE student writing about "
    "technology, programming, robotics, reviews, findings and life."
)
PORTFOLIO_URL = "https://enigma-101.github.io/Portfolio/"
GITHUB_URL = "https://github.com/ENiGMA-101"
LINKEDIN_URL = "https://www.linkedin.com/"
EMAIL = ""

SOCIAL = (
    ("GitHub", GITHUB_URL, "github"),
    ("Portfolio", PORTFOLIO_URL, "briefcase"),
)

# Related articles
RELATED_POSTS_MAX = 3
