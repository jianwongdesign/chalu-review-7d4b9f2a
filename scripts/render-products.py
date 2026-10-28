"""Render four standalone, shareable product pages from one maintained template."""
from pathlib import Path
from string import Template
from html import escape
import json
import re
import sys
ROOT = Path(__file__).resolve().parent.parent
home = (ROOT / 'index.html').read_text()
products = json.loads((ROOT / 'docs/products.json').read_text())

def home_links(markup):
    return re.sub(r'href="#([^\"]*)"', lambda m: 'href="index.html' + ('#' + m[1] if m[1] else '') + '"', markup)

header = home_links(re.search(r'<header class="site-header">.*?</header>', home, re.S)[0])
footer = home_links(re.search(r'<footer>.*?</footer>', home, re.S)[0]).replace('class="back-top" href="index.html"', 'class="back-top" href="#main"')
bag = re.search(r'<dialog id="bag-dialog".*?(?=  </body>)', home, re.S)[0]
cards = {p['id']: re.search(r'<article class="product ' + p['id'] + r'">.*?</article>', home, re.S)[0] for p in products}
template = Template((ROOT / 'templates/product.html').read_text())
for product in products:
    values = {k: escape(str(v), quote=True) for k, v in product.items() if k not in ('notes', 'pairings')}
    values.update(header=header, footer=footer, bag=bag,
        notes=''.join(f'<li><strong>{escape(a)}</strong><span>{escape(b)}</span></li>' for a,b in product['notes']),
        pairings=''.join(f'<li><span class="pairing-number">0{i+1}</span><div><h3>{escape(dish)}</h3><p>{escape(why)}</p></div></li>' for i,(dish,why) in enumerate(product['pairings'])),
        price_label=f"S${product['price']/100:.2f}",
        blend_heading='The blend' if product['id']=='rose' else 'Ingredients',
        related='\n'.join(card for key,card in cards.items() if key != product['id']))
    content = template.substitute(values)
    path = ROOT / (product['slug'] + '.html')
    if '--check' in sys.argv:
        assert path.exists() and path.read_text() == content, f'Regenerate product pages: {path.name}'
    else:
        path.write_text(content)
print('Product pages match their template.' if '--check' in sys.argv else 'Rendered four product pages.')
