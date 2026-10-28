"""Render the shared WhatsApp launcher without inventing a destination number."""
from pathlib import Path
from html import escape
from urllib.parse import urlencode
import json
import re
import sys
ROOT = Path(__file__).resolve().parent.parent
contact = json.loads((ROOT / 'docs/contact.json').read_text())
number = contact['whatsapp_number']
assert not number or re.fullmatch(r'[1-9][0-9]{7,14}', number), 'Use a country-code number, digits only.'
icon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 .8A15.1 15.1 0 0 0 3.1 23.9L1 31l7.3-2A15.2 15.2 0 1 0 16 .8Zm0 27.7a12.5 12.5 0 0 1-6.4-1.8l-.5-.3-4.3 1.2 1.2-4.2-.3-.5A12.5 12.5 0 1 1 16 28.5Zm6.9-9.4c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.3 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.4 3.6 1.6 3.8c.2.3 2.7 4.1 6.5 5.7.9.4 1.6.6 2.2.8.9.3 1.8.2 2.5.2.8-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"/></svg>'
inner = icon + '<span class="whatsapp-label">Chat on WhatsApp</span><span class="whatsapp-arrow" aria-hidden="true">↗</span>'
if number:
    href = escape('https://wa.me/' + number + '?' + urlencode({'text': contact['whatsapp_message']}), quote=True)
    launcher = f'<a class="whatsapp-float" href="{href}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Chalu on WhatsApp">{inner}</a>'
    notice = ''
else:
    launcher = f'<button class="whatsapp-float" type="button" aria-label="Preview WhatsApp contact" aria-haspopup="dialog" data-whatsapp-preview>{inner}</button>'
    notice = '<dialog class="whatsapp-preview" id="whatsapp-preview" aria-labelledby="whatsapp-preview-title"><button class="whatsapp-close" type="button" aria-label="Close WhatsApp preview">×</button>' + icon + '<h2 id="whatsapp-preview-title">Let’s talk tea.</h2><p>This is a demo of the WhatsApp contact button. A chat number has not been connected yet.</p><button class="button button-dark whatsapp-dismiss" type="button">Keep exploring <span aria-hidden="true">↗</span></button></dialog>'
markup = '<!-- WHATSAPP START -->\n' + launcher + notice + '<script src="contact.js?v=20261028-whatsapp" defer></script>\n<!-- WHATSAPP END -->'
p = ROOT / 'index.html'
home = p.read_text()
if '<!-- WHATSAPP START -->' in home:
    updated = re.sub(r'<!-- WHATSAPP START -->.*?<!-- WHATSAPP END -->', lambda _: markup, home, flags=re.S)
else:
    updated = home.replace('    </footer>', '      ' + markup + '\n    </footer>', 1)
if '--check' in sys.argv:
    assert home == updated, 'Regenerate WhatsApp contact: python3 scripts/render-contact.py'
else:
    p.write_text(updated)
print('WhatsApp contact matches configuration.' if '--check' in sys.argv else 'Rendered WhatsApp contact.')
