# miatsuco Pelican theme

A Pelican theme with light/dark mode (via CSS `light-dark()`), a
collapsible nav dropdown, syntax-highlighted code blocks, and an
accordion component (via `pymdownx.details`).

## Using this theme

Point your site's `pelicanconf.py` at this checkout:

```python
THEME = "/path/to/miatsuco-pelican-theme"
```

### Required settings

These are plain Pelican settings the theme's templates read directly
(no custom Jinja globals needed):

```python
SITENAME = "..."
SITEURL = "..."
SITELOGO = "theme/pictures/logowhite.png"       # or your own logo
SITE_FAVICON = "theme/pictures/logocube.png"    # or your own favicon
SITE_DESCRIPTION = "..."

EXTERNAL_NAV_LINKS = [
    {"label": "Chat", "url": "https://chat.example.com/"},
]

PAGE_ORDER_BY = "sortorder"  # pages need a `Sortorder:` metadata field
```

### Nav grouping

The header dropdown groups pages by folder. Give a page's path a
`section` name (and optionally a `footer` group) via `PATH_METADATA`:

```python
PATH_METADATA = r'pages[\\/](?:(?P<footer>Footer)[\\/].*|(?P<section>[^\\/]+)[\\/].*)'
```

Pages directly under `content/pages/<Section Name>/` become a nav
dropdown group named `<Section Name>`; pages under `content/pages/Footer/`
go in the footer instead of the nav.

### Markdown extensions

The theme's code-block and accordion styling expects:

```python
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight", "linenums": True},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
        "pymdownx.details": {},
    },
}
```

`pymdownx.details` (from the `pymdown-extensions` package) powers the
`??? accordion-item "Title"` syntax used for collapsible content.
`markdown.extensions.extra` bundles tables, footnotes, definition
lists, and abbreviations, which the theme also styles.

### Design tokens

All colors, spacing, and the border-radius scale live as CSS custom
properties at the top of `static/css/main.css` (`--accent-light`,
`--surface`, `--radius`, etc.) using `light-dark()` for the two
themes. Override them in your own stylesheet, loaded after this
theme's, rather than editing this file directly if you fork it.
