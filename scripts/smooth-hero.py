"""Build the eased hero loop from the original Kling V2 source using FFmpeg.

Usage: python3 scripts/smooth-hero.py INPUT.mp4 OUTPUT.mp4
The source stays local. This runs no generation service and spends no credits.
"""
import argparse
import math
from pathlib import Path
import subprocess
import tempfile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path)
parser.add_argument('output', type=Path)
args = parser.parse_args()
assert args.source.is_file(), 'Supply the original Kling V2 video.'
args.output.parent.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='chalu-hero-') as work:
    work = Path(work)
    frames = work / 'frames'
    ordered = work / 'ordered'
    frames.mkdir()
    ordered.mkdir()
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'warning', '-y',
        '-i', str(args.source.resolve()), '-t', '2.4', '-vf',
        'minterpolate=fps=120:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1',
        '-q:v', '2', str(frames / '%04d.jpg')], check=True)
    assert (frames / '0266.jpg').is_file(), 'Source is too short for the intended crop.'
    # One cosine cycle: zero velocity at both turnarounds and the repeat seam.
    for frame in range(480):
        index = round(265 * (1 - math.cos(2 * math.pi * frame / 480)) / 2) + 1
        (ordered / f'{frame + 1:04d}.jpg').symlink_to(frames / f'{index:04d}.jpg')
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
        '-framerate', '60', '-i', str(ordered / '%04d.jpg'), '-an',
        '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(args.output.resolve())], check=True)
