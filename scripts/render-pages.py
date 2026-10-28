"""Render the main navigation destinations from shared homepage content."""
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
 dict(slug='shop',section='collection',title='Shop the collection',description='Find your expression of Chalu. Four alcohol-free sparkling teas, individual tasting notes and suggested food pairings.',image='hero',next_title='A story rooted in Yunnan.',next_url='story.html',next_label='Our story'),
 dict(slug='story',section='story',title='Our story',description='Meet the people and the Yunnan roots behind Chalu sparkling tea.',image='founders',next_title='Nature leads. Craft follows.',next_url='craft.html',next_label='Explore the craft'),
 dict(slug='craft',section='craft',title='The craft',description='Discover Chalu’s approach to Yunnan tea, patient cold brewing and native oak.',image='leaves',next_title='Four teas. A world of character.',next_url='shop.html',next_label='Shop the collection'),
 dict(slug='ritual',section='ritual',title='The ritual',description='Chill, pour and savour Chalu. Serving guidance and suggested pairings for your next table.',image='pour',next_title='A little sparkle for the table.',next_url='shop.html',next_label='Shop the collection'),
 dict(slug='news',section='news',title='News & stories',description='Stories from Chalu and ideas for your table. Explore tea, serving and food pairings in this editorial preview.',image='table',next_title='A story worth sharing.',next_url='story.html',next_label='Our story')
]
pairing_links=''.join(f'<a class="ritual-pairing-link {key}" href="{slug}.html"><img src="assets/{key}.webp" width="100" height="300" alt="{name} bottle" loading="lazy"><div><h3>{name}</h3><p>{dish}</p><span class="text-link">Tasting notes &amp; pairings ↗</span></div></a>' for key,slug,name,dish in [('jasmine','snow-jasmine','Snow Jasmine','Try with steamed fish or a pear tart.'),('hibiscus','hibiscus-noir','Hibiscus Noir','Try with roast duck or a soft cheese board.'),('oolong','volcano-oolong','Volcano Oolong','Try with grilled fish or roasted mushrooms.'),('rose','untamed-rose','Untamed Rosé','Try with salmon or a strawberry tart.')])
next_copy={
 'news': '<p>Get to know the people and the place behind the collection, then choose a tea to bring to your own table.</p><p>Explore Chalu’s story, its approach to craft and four expressions made for sharing.</p>',
 'shop': '<p>Follow Chalu back to Yunnan and meet Mia and Fraser, the two people behind the collection. Their shared curiosity about tea became a drink made for the moments we spend around a table.</p><p>Discover the story, then find an expression to make part of your own next gathering.</p>',
 'story': '<p>Continue from the people behind Chalu to the way the tea is made. Explore the role of the leaves, cold brewing and Yunnan oak, then take a closer look at the character of each expression.</p><p>The craft page offers a few ways to notice those details when you pour your first glass.</p>',
 'craft': '<p>Bring what you have discovered into the glass. Compare the four expressions, explore their tasting notes and choose a bottle for the food you enjoy sharing.</p><p>Every tea has its own page with the blend, serving guidance and suggested dishes to try.</p>',
 'ritual': '<p>Choose a tea for the meal you have in mind. Start with a favourite dish, explore the suggested pairings and find a bottle you would like to share.</p><p>From the first glass to dessert, there is room to try a different expression as the table changes.</p>'
}
template=Template((ROOT/'templates/page.html').read_text())
for page in pages:
 content=re.search(r'<section\b[^>]*\bid="'+page['section']+r'"[^>]*>.*?</section>',home,re.S)[0]
 content=content.replace('<h2','<h1',1).replace('</h2>','</h1>',1)
 if page['slug']=='news': content=re.sub(r'<a class="text-link news-all".*?</a>','',content)
 current_header=header.replace('href="'+page['slug']+'.html"','href="'+page['slug']+'.html" aria-current="page"')
 extra=(ROOT/'templates/pages'/f"{page['slug']}.html").read_text().replace('$pairing_links',pairing_links)
 page['next_body']=next_copy[page['slug']]
 result=template.substitute(**{**page,'header':current_header,'footer':footer,'bag':bag,'content':content,'extra':extra,'extra_script':'<script src="collection.js" defer></script>' if page['slug']=='shop' else ''})
 target=ROOT/(page['slug']+'.html')
 if '--check' in sys.argv: assert target.exists() and target.read_text()==result, f'Regenerate navigation pages: {target.name}'
 else: target.write_text(result)
print('Navigation pages match their template.' if '--check' in sys.argv else 'Rendered navigation pages.')
