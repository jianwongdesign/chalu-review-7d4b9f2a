"""Validate and package the static preview. Python standard library only."""
from html.parser import HTMLParser
from pathlib import Path
import re
import shutil

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
        for key in ("src", "href"):
            value = attrs.get(key, "")
            if value.startswith("#") and len(value) > 1:
                self.targets.append(value[1:])
            elif value and not value.startswith(("#", "https:", "mailto:")):
                self.assets.append(value)


page = Page()
page.feed((ROOT / "index.html").read_text())
assert page.headings == 1, "Expected exactly one H1"
assert page.noindex, "Preview must remain noindex"
assert set(page.targets) <= page.ids, f"Missing anchor: {set(page.targets) - page.ids}"
for asset in page.assets:
    assert (ROOT / asset).is_file(), f"Missing asset: {asset}"
for asset in re.findall(r"url\(['\"]?([^'\")]+)", (ROOT / "styles.css").read_text()):
    assert (ROOT / asset).is_file(), f"Missing CSS asset: {asset}"
for tea in ("jasmine", "hibiscus", "oolong", "rose"):
    assert (ROOT / f"assets/{tea}.webp").is_file(), f"Missing product: {tea}"

if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()
for name in ("index.html", "styles.css", "site.js", "robots.txt", ".nojekyll"):
    shutil.copy2(ROOT / name, DIST / name)
shutil.copytree(ROOT / "assets", DIST / "assets")
print(f"Validated and built {sum(1 for p in DIST.rglob('*') if p.is_file())} static files in dist/")
