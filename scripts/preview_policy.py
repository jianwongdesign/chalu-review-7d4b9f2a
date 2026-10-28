"""Package a time-limited preview. Deployed expiry removes the original assets."""
from datetime import datetime, timezone
from pathlib import Path
from html import escape
import json
import shutil

ROOT = Path(__file__).resolve().parent.parent


def read_policy():
    policy = json.loads((ROOT / 'preview-policy.json').read_text())
    start = datetime.fromisoformat(policy['starts_at'].replace('Z', '+00:00'))
    end = datetime.fromisoformat(policy['expires_at'].replace('Z', '+00:00'))
    if start.tzinfo is None or end.tzinfo is None or end <= start:
        raise ValueError('Preview dates must be timezone-aware, with expiry after start.')
    return policy, end


def package_preview(output, page_files, now=None):
    policy, expires_at = read_policy()
    now = now or datetime.now(timezone.utc)
    expired = now >= expires_at
    ended_page = (ROOT / 'templates/preview-expired.html').read_text()
    if expired:
        # The deployment contains no original media, scripts or page content.
        shutil.rmtree(output)
        output.mkdir(parents=True)
        for filename in (*page_files, '404.html'):
            (output / filename).write_text(ended_page)
        for filename in ('robots.txt', '.nojekyll'):
            shutil.copy2(ROOT / filename, output / filename)
    else:
        expires = escape(policy['expires_at'], quote=True)
        markup = f'<link rel="stylesheet" href="preview.css?v=1"><script src="preview.js?v=1" data-expires="{expires}"></script>'
        for filename in page_files:
            path = output / filename
            content = path.read_text()
            # Keep the guard before deferred application scripts and visible content.
            assert '<head>' in content, f'Missing document head: {filename}'
            path.write_text(content.replace('<head>', '<head>\n' + markup, 1))
        for filename in ('preview.js', 'preview.css'):
            shutil.copy2(ROOT / filename, output / filename)
    (output / 'preview-expired.html').write_text(ended_page)
    (output / 'preview-state.json').write_text(json.dumps({
        'status': 'expired' if expired else 'active',
        'expires_at': policy['expires_at'],
    }) + '\n')
    return expired
