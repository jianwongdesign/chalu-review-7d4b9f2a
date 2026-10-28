"""Validate and package the static preview. Python standard library only."""
from html.parser import HTMLParser
from pathlib import Path
import re
import shutil
import json
import subprocess
import sys
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.targets = []
        self.assets = []
        self.headings = 0
        self.noindex = False
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"Duplicate id: {attrs['id']}"
            self.ids.add(attrs["id"])
        if tag == "h1":
            self.headings += 1
        if tag == "meta" and attrs.get("name") == "robots":
            self.noindex = "noindex" in attrs.get("content", "")
        if tag == "img":
            assert "alt" in attrs, f"Missing image alternative text: {attrs}"
        for key in ("src", "href", "poster", "data-src", "data-mobile-src", "data-poster", "data-mobile-poster", "srcset"):
            value = attrs.get(key, "")
            if value.startswith("#") and len(value) > 1:
                self.targets.append(value[1:])
            elif value and not value.startswith(("#", "https:", "mailto:")):
                parsed = urlsplit(value)
                self.assets.append(parsed.path)
                if parsed.fragment:
                    self.links.append((parsed.path, parsed.fragment))


PRODUCT_PAGES = tuple(p["slug"] + ".html" for p in json.loads((ROOT / "docs/products.json").read_text()))
NAV_PAGES = ("shop.html", "story.html", "craft.html", "ritual.html")
PAGE_FILES = ("index.html", "checkout.html", *PRODUCT_PAGES, *NAV_PAGES)
subprocess.run([sys.executable, str(ROOT / "scripts/render-products.py"), "--check"], check=True)
subprocess.run([sys.executable, str(ROOT / "scripts/render-pages.py"), "--check"], check=True)
pages = {}
for filename in PAGE_FILES:
    page = Page()
    page.feed((ROOT / filename).read_text())
    assert page.headings == 1, f"Expected exactly one H1 in {filename}"
    assert page.noindex, f"Preview must remain noindex: {filename}"
    assert set(page.targets) <= page.ids, f"Missing anchor: {set(page.targets) - page.ids}"
    for asset in page.assets:
        assert (ROOT / asset).is_file(), f"Missing asset: {asset}"
    pages[filename] = page
for page in pages.values():
    for filename, target in page.links:
        assert target in pages[filename].ids, f"Missing destination: {filename}#{target}"
for filename in ("styles.css", "shop.css", "product.css", "motion.css", "pages.css"):
    for asset in re.findall(r"url\(['\"]?([^'\")]+)", (ROOT / filename).read_text()):
        assert (ROOT / asset).is_file(), f"Missing CSS asset: {asset}"
for tea in ("jasmine", "hibiscus", "oolong", "rose"):
    assert (ROOT / f"assets/{tea}.webp").is_file(), f"Missing product: {tea}"

if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()
for name in (*PAGE_FILES, "styles.css", "shop.css", "product.css", "motion.css", "pages.css", "motion.js", "site.js", "navigation.js", "product.js", "collection.js", "commerce.js", "checkout.js", "robots.txt", ".nojekyll"):
    shutil.copy2(ROOT / name, DIST / name)
shutil.copytree(ROOT / "assets", DIST / "assets")
print(f"Validated and built {sum(1 for p in DIST.rglob('*') if p.is_file())} static files in dist/")
