Title: Code style test
Date: 2012-07-09 22:28
Status: hidden

# Heading level 1

## Heading level 2

### Heading level 3

A paragraph with *italic*, **bold**, and ***bold italic*** text, plus a
[link to an example](https://example.com) and an inline image:
![A placeholder image](https://placehold.co/400x200 "Placeholder title").

This line ends with a hard break (two trailing spaces).  
This is the next line, right below it.

> A blockquote, to check quote styling.

An unordered list:

- First item
- Second item
    - Nested item
- Third item

An ordered list:

1. First step
2. Second step
    1. Nested step
3. Third step

---

This paragraph has some `inline_code_example()` sitting in the middle of a sentence, plus a second one right at the `end_of_line`.

Here's a fenced code block with no language hint:

```
def add(a, b):
    return a + b
```

Here's one with a language hint, to check syntax highlighting:

```python
import json

def load_fields(path):
    with open(path) as f:
        return json.load(f)

class ApplicationForm:
    def __init__(self, fields):
        self.fields = fields
```

And a longer line to check horizontal overflow handling:

```bash
curl -s -X POST https://example.com/api/v1/applications --data '{"name": "test", "email": "test@example.com", "role_interest": "Member"}'
```

Here's a table, to check table styling:

| Field | Type | Required |
| --- | --- | --- |
| Email | string | Yes |
| Age | number | Yes |
| Notes | text | No |

Here's a paragraph with a footnote[^1] and an abbreviation like HTML in it.

[^1]: This is the footnote text, shown at the bottom of the page.

*[HTML]: HyperText Markup Language

Here's a definition list:

Apple
: A fruit that grows on trees.

Carrot
: A root vegetable.

Here's a heading with an `attr_list`-assigned id:

### A heading with a custom id {: #custom-heading-id }

??? note "A collapsible details block"
    This content is hidden until the block is expanded.
