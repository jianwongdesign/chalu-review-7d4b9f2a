import unittest
import tempfile
from pathlib import Path
from datetime import timedelta
from preview_policy import package_preview, read_policy


class PreviewPolicyTests(unittest.TestCase):
    def test_nested_portfolio_guard_and_expiry_remove_exported_media(self):
        _, end = read_policy()
        with tempfile.TemporaryDirectory() as folder:
            output = Path(folder) / 'dist'
            (output / 'kita-export/images').mkdir(parents=True)
            (output / 'kita-export/index.html').write_text('<html><head></head><body>PORTFOLIO</body></html>')
            (output / 'kita-export/images/cover.png').write_bytes(b'EXPORTED MEDIA')
            self.assertFalse(package_preview(output, ('kita-export/index.html',), end - timedelta(seconds=1)))
            content = (output / 'kita-export/index.html').read_text()
            self.assertIn('src="../preview.js?v=1"', content)
            self.assertIn('href="../preview.css?v=1"', content)
            self.assertTrue(package_preview(output, ('kita-export/index.html',), end))
            self.assertIn('This preview has ended.', (output / 'kita-export/index.html').read_text())
            self.assertFalse((output / 'kita-export/images').exists())

    def test_duration_is_ten_and_a_half_days(self):
        from datetime import datetime
        policy, end = read_policy()
        start = datetime.fromisoformat(policy['starts_at'].replace('Z', '+00:00'))
        self.assertEqual(end - start, timedelta(days=10, hours=12))

    def test_before_deadline_keeps_content_and_guards_every_route(self):
        _, end = read_policy()
        with tempfile.TemporaryDirectory() as folder:
            output = Path(folder) / 'dist'
            output.mkdir()
            for name in ('index.html', 'shop.html', 'checkout.html'):
                (output / name).write_text('<html><head></head><body>DEMO CONTENT</body></html>')
            expired = package_preview(output, ('index.html', 'shop.html', 'checkout.html'), end - timedelta(seconds=1))
            self.assertFalse(expired)
            for name in ('index.html', 'shop.html', 'checkout.html'):
                content = (output / name).read_text()
                self.assertIn('DEMO CONTENT', content)
                self.assertIn('data-expires=', content)
                self.assertIn('preview.js', content)
            self.assertTrue((output / 'preview-expired.html').is_file())

    def test_at_deadline_replaces_routes_and_removes_assets(self):
        _, end = read_policy()
        with tempfile.TemporaryDirectory() as folder:
            output = Path(folder) / 'dist'
            (output / 'assets').mkdir(parents=True)
            (output / 'assets' / 'bottle.webp').write_bytes(b'PRIVATE PREVIEW MEDIA')
            (output / 'site.js').write_text('original script')
            for name in ('index.html', 'shop.html', 'checkout.html'):
                (output / name).write_text('DEMO CONTENT')
            self.assertTrue(package_preview(output, ('index.html', 'shop.html', 'checkout.html'), end))
            self.assertFalse((output / 'assets').exists())
            self.assertFalse((output / 'site.js').exists())
            for name in ('index.html', 'shop.html', 'checkout.html', '404.html'):
                content = (output / name).read_text()
                self.assertIn('This preview has ended.', content)
                self.assertNotIn('DEMO CONTENT', content)
            self.assertIn('"status": "expired"', (output / 'preview-state.json').read_text())

class ScheduledRetirementTests(unittest.TestCase):
    def run_check(self, state=None, fetch_error=False, before=False):
        import io, json, os, runpy
        from unittest.mock import patch
        from datetime import datetime, timezone
        policy, deadline = read_policy()
        deadline = datetime.now(timezone.utc) + timedelta(days=1 if before else -1)
        with tempfile.TemporaryDirectory() as folder:
            output = Path(folder) / 'outputs'
            with patch.dict(os.environ, {'GITHUB_EVENT_NAME': 'schedule', 'GITHUB_OUTPUT': str(output)}), patch('preview_policy.read_policy', return_value=(policy, deadline)), patch('urllib.request.urlopen') as fetch:
                if fetch_error:
                    fetch.side_effect = OSError('Temporary network failure')
                else:
                    fetch.return_value.__enter__.return_value = io.StringIO(json.dumps(state))
                runpy.run_path(str(Path(__file__).parent / 'preview_deploy_check.py'), run_name='__main__')
                if before:
                    fetch.assert_not_called()
            return output.read_text().strip()

    def test_schedule_leaves_active_review_period_alone(self):
        self.assertEqual(self.run_check(before=True), 'deploy=false')

    def test_schedule_retires_active_or_unreachable_deployment(self):
        self.assertEqual(self.run_check({'status': 'active'}), 'deploy=true')
        self.assertEqual(self.run_check(fetch_error=True), 'deploy=true')

    def test_schedule_stops_redeploying_once_retired(self):
        policy, _ = read_policy()
        state = {'status': 'expired', 'expires_at': policy['expires_at']}
        self.assertEqual(self.run_check(state), 'deploy=false')


if __name__ == '__main__':
    unittest.main()
