"""Render the four main navigation destinations from shared homepage content."""
from pathlib import Path
from string import Template
import re
import sys
ROOT=Path(__file__).resolve().parent.parent
home=(ROOT/'index.html').read_text()
header=re.search(r'<header class="site-header">.*?</header>',home,re.S)[0]
header=header.replace('href="#"','href="index.html"').replace('href="#contact"','href="index.html#contact"')
footer=re.search(r'<footer>.*?</footer>',home,re.S)[0].replace('href="#"','href="index.html"')
footer=footer.replace('class="back-top" href="index.html"','class="back-top" href="#main"')
bag=re.search(r'<dialog id="bag-dialog".*?(?=  </body>)',home,re.S)[0]
pages=[
 dict(slug='shop',section='collection',title='Shop the collection',description='Find your expression of Chalu. Four alcohol-free sparkling teas, individual tasting notes and suggested food pairings.',image='hero',next_title='A story rooted in Yunnan.',next_url='story.html',next_label='Our story',extra=''),
 dict(slug='story',section='story',title='Our story',description='Meet the people and the Yunnan roots behind Chalu sparkling tea.',image='founders',next_title='Nature leads. Craft follows.',next_url='craft.html',next_label='Explore the craft',extra='<section class="page-editorial"><img src="assets/landscape.webp" alt="Tea gathered in Yunnan" width="1000" height="1000" loading="lazy"><div><h2>The road to Chalu.</h2><p>Chalu takes its name from the Tea Horse Road. Tea, place and the people around the table remain at the heart of the brand.</p><p>Today, Mia’s love of tea and Fraser’s brewing experience come together in four expressions made for sharing.</p><a class="text-link" href="shop.html">Explore the collection ↗</a></div></section>'),
 dict(slug='craft',section='craft',title='The craft',description='Discover Chalu’s approach to Yunnan tea, patient cold brewing and native oak.',image='leaves',next_title='Four teas. A world of character.',next_url='shop.html',next_label='Shop the collection',extra='<section class="page-editorial"><img src="assets/leaves.webp" alt="Fresh tea leaves gathered by hand" width="1000" height="1500" loading="lazy"><div><h2>Give good tea time.</h2><p>Cold brewing draws out the tea’s delicate aromas. Native Yunnan oak brings another layer of character before the final sparkle.</p><p>Explore each tea’s own page for its flavour notes, blend and a few ideas for the table.</p><a class="text-link" href="ritual.html">Find your ritual ↗</a></div></section>'),
 dict(slug='ritual',section='ritual',title='The ritual',description='Chill, pour and savour Chalu. Serving guidance and suggested pairings for your next table.',image='pour',next_title='A little sparkle for the table.',next_url='shop.html',next_label='Shop the collection',extra='<section class="ritual-pairings"><h2>Find your pairing.</h2><p>Each tea brings a different character to the table. Explore its tasting notes and suggested dishes.</p><div class="ritual-pairing-grid">$pairing_links</div></section>')
]
pairing_links=''.join(f'<a class="ritual-pairing-link {key}" href="{slug}.html"><img src="assets/{key}.webp" width="100" height="300" alt="{name} bottle" loading="lazy"><div><h3>{name}</h3><p>{dish}</p><span class="text-link">Tasting notes &amp; pairings ↗</span></div></a>' for key,slug,name,dish in [('jasmine','snow-jasmine','Snow Jasmine','Try with steamed fish or a pear tart.'),('hibiscus','hibiscus-noir','Hibiscus Noir','Try with roast duck or a soft cheese board.'),('oolong','volcano-oolong','Volcano Oolong','Try with grilled fish or roasted mushrooms.'),('rose','untamed-rose','Untamed Rosé','Try with salmon or a strawberry tart.')])
template=Template((ROOT/'templates/page.html').read_text())
for page in pages:
 content=re.search(r'<section\b[^>]*\bid="'+page['section']+r'"[^>]*>.*?</section>',home,re.S)[0]
 content=content.replace('<h2','<h1',1).replace('</h2>','</h1>',1)
 current_header=header.replace('href="'+page['slug']+'.html"','href="'+page['slug']+'.html" aria-current="page"')
 extra=page['extra'].replace('$pairing_links',pairing_links)
 result=template.substitute(**{**page,'header':current_header,'footer':footer,'bag':bag,'content':content,'extra':extra,'extra_script':'<script src="collection.js" defer></script>' if page['slug']=='shop' else ''})
 target=ROOT/(page['slug']+'.html')
 if '--check' in sys.argv: assert target.exists() and target.read_text()==result, f'Regenerate navigation pages: {target.name}'
 else: target.write_text(result)
print('Navigation pages match their template.' if '--check' in sys.argv else 'Rendered four navigation pages.')
