"""Only redeploy scheduled runs when the expired preview still needs retiring."""
from datetime import datetime, timezone
from urllib.request import urlopen
import json
import os
from preview_policy import read_policy

policy, deadline = read_policy()
now = datetime.now(timezone.utc)
deploy = os.environ.get('GITHUB_EVENT_NAME') != 'schedule'
if not deploy and now >= deadline:
    deploy = True
    try:
        url = 'https://jianwongdesign.github.io/chalu-review-7d4b9f2a/preview-state.json?expiry-check=' + str(int(now.timestamp()))
        with urlopen(url, timeout=15) as response:
            state = json.load(response)
        deploy = state != {'status': 'expired', 'expires_at': policy['expires_at']}
    except Exception:
        # Retry retirement rather than leaving a possibly active release online.
        pass
with open(os.environ['GITHUB_OUTPUT'], 'a') as output:
    output.write('deploy=' + str(deploy).lower() + '\n')
print('Deploy preview state.' if deploy else 'No expiry deployment needed.')
