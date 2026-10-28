"""Render the homepage news section and three sample editorial article pages."""
from pathlib import Path
from html import escape
from string import Template
import json
import re
import sys
ROOT = Path(__file__).resolve().parent.parent
items = json.loads((ROOT / 'docs/news.json').read_text())

def card(item):
    title, summary, alt = (escape(item[key]) for key in ('title', 'summary', 'image_alt'))
    return f'<article class="news-card"><a class="news-image" href="{item["slug"]}.html" aria-label="Read {title}"><img src="assets/{item["image"]}.webp" width="1200" height="900" alt="{alt}" loading="lazy"></a><div class="news-card-copy"><h3><a href="{item["slug"]}.html">{title}</a></h3><p>{summary}</p><a class="text-link" href="{item["slug"]}.html" aria-label="Read story: {title}">Read story ↗</a></div></article>'

section = '<!-- NEWS START -->\n<section class="news-section" id="news" aria-labelledby="news-title"><div class="news-heading"><div><h2 id="news-title">News &amp; stories.</h2><p>Ideas for your table, a closer look at the tea, and stories from Chalu.</p></div><a class="text-link news-all" href="news.html">View all stories ↗</a></div><p class="editorial-notice">Sample editorial stories for this design preview.</p><div class="news-grid">' + ''.join(card(item) for item in items) + '</div></section>\n<!-- NEWS END -->'
home_path = ROOT / 'index.html'
home = home_path.read_text()
updated = re.sub(r'<!-- NEWS START -->.*?<!-- NEWS END -->', lambda _: section, home, flags=re.S)
assert updated != home or section in home, 'Missing homepage news markers.'
if '--check' in sys.argv:
    assert home == updated, 'Regenerate homepage news: python3 scripts/render-news.py'
else:
    home_path.write_text(updated)
home = updated
header = re.search(r'<header class="site-header">.*?</header>', home, re.S)[0].replace('href="#"','href="index.html"').replace('href="#contact"','href="index.html#contact"').replace('href="news.html"','href="news.html" aria-current="page"')
footer = re.search(r'<footer>.*?</footer>', home, re.S)[0].replace('href="#"','href="index.html"').replace('class="back-top" href="index.html"','class="back-top" href="#main"')
bag = re.search(r'<dialog id="bag-dialog".*?(?=  </body>)', home, re.S)[0]
template = Template((ROOT / 'templates/article.html').read_text())
for item in items:
    body = ''.join('<section><h2>' + escape(part['heading']) + '</h2>' + ''.join('<p>' + escape(p) + '</p>' for p in part['paragraphs']) + '</section>' for part in item['sections'])
    values = {k: escape(v, quote=True) for k,v in item.items() if isinstance(v, str)}
    values.update(header=header, footer=footer, bag=bag, body=body,
        source='<p class="article-source">Brand background: <a href="https://chaludrinks.com/" target="_blank" rel="noopener noreferrer">Chalu ↗</a></p>' if item['source_url'] else '',
        related=''.join(card(other) for other in items if other != item))
    result = template.substitute(values)
    path = ROOT / (item['slug'] + '.html')
    if '--check' in sys.argv:
        assert path.exists() and path.read_text() == result, f'Regenerate article: {path.name}'
    else:
        path.write_text(result)
print('News content matches its source.' if '--check' in sys.argv else 'Rendered news section and article pages.')
