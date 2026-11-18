#!/usr/bin/env python3
"""Build the narrated tour videos from the tour screens and the `say` lines in build/tour-content.js.

Each screen stays up while its line is read, with a short pause and a fade between screens. The voice is the
same ElevenLabs voice as Koma in the app. Requires ELEVENLABS_API_KEY, node and ffmpeg.

    ELEVENLABS_API_KEY=... python3 build/make-tour-video.py [--work DIR] [--lang ru] [--lang en]

Speech is cached in the work folder by text, so changing one line asks ElevenLabs for that line only.
"""
import argparse
import hashlib
import json
import os
import subprocess
import tempfile
from datetime import date
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "media" / "tour"
VOICE = {
    "voice_id": "EXAVITQu4vr4xnSDxMaL",  # Sarah, as Koma's voice in the app
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.0, "use_speaker_boost": True},
}
PAUSE = 0.7  # seconds of quiet after each line
FADE = 0.25


def content():
    script = "const c = require(process.argv[1]); console.log(JSON.stringify(c));"
    out = subprocess.run(["node", "-e", script, str(ROOT / "build" / "tour-content.js")],
                         check=True, capture_output=True, text=True).stdout
    return json.loads(out)


def speech(text, work, key, lang):
    path = work / f"{lang}-{hashlib.sha256(text.encode()).hexdigest()[:16]}.mp3"
    if path.exists():
        return path
    body = json.dumps({"text": text, **{k: VOICE[k] for k in ("model_id", "voice_settings")},
                       "language_code": lang}).encode()
    request = Request(f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE['voice_id']}?output_format=mp3_44100_128",
                      data=body, headers={"xi-api-key": key, "Content-Type": "application/json",
                                          "Accept": "audio/mpeg"})
    try:
        with urlopen(request, timeout=120) as response:
            path.write_bytes(response.read())
    except HTTPError as error:
        # Never print the request: it carries the key.
        raise SystemExit(f"ElevenLabs returned HTTP {error.code}: {error.read()[:300]!r}") from None
    return path


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                         check=True, capture_output=True, text=True).stdout
    return float(out)


def build(lang, data, work, key):
    screens, lines = data["SCREENS"], data["CONTENT"][lang]["screens"]
    assert len(screens) == len(lines), "one line per screen"
    segments = []
    for number, (screen, line) in enumerate(zip(screens, lines)):
        audio = speech(line["say"], work, key, lang)
        length = duration(audio) + PAUSE + (0.4 if number == 0 else 0)
        segment = work / f"{lang}-{number:02d}.mp4"
        delay = 400 if number == 0 else 0
        subprocess.run([
            "ffmpeg", "-v", "error", "-y", "-loop", "1", "-framerate", "30", "-i", str(MEDIA / f"{screen}.png"),
            "-i", str(audio),
            "-filter_complex",
            f"[0:v]format=yuv420p,fade=t=in:st=0:d={FADE},fade=t=out:st={length - FADE:.3f}:d={FADE}[v];"
            f"[1:a]adelay={delay}|{delay},apad,atrim=0:{length:.3f},aresample=44100[a]",
            "-map", "[v]", "-map", "[a]", "-t", f"{length:.3f}",
            "-c:v", "libx264", "-tune", "stillimage", "-crf", "20", "-preset", "slow",
            "-c:a", "aac", "-b:a", "128k", "-ac", "1", str(segment)], check=True)
        segments.append(segment)
    listing = work / f"{lang}-list.txt"
    listing.write_text("".join(f"file '{s}'\n" for s in segments))
    out = MEDIA / f"outdraft-tour-{lang}.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(listing),
                    "-c", "copy", "-movflags", "+faststart", str(out)], check=True)
    seconds = duration(out)
    print(f"{out.relative_to(ROOT)}: {seconds:.0f} s, {out.stat().st_size // 1024} KB")
    # The page shows the length and uses the version to refresh browser caches.
    index_path = ROOT / "build" / "tour-videos.json"
    index = json.loads(index_path.read_text()) if index_path.exists() else {}
    index[lang] = {"file": out.name, "seconds": round(seconds, 1), "version": hashlib.sha256(out.read_bytes()).hexdigest()[:8],
                   "date": date.today().isoformat()}
    index_path.write_text(json.dumps(index, indent=2, sort_keys=True) + "\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--work", type=Path, default=Path(tempfile.gettempdir()) / "outdraft-tour")
    parser.add_argument("--lang", action="append", choices=["en", "ru", "uk"])
    args = parser.parse_args()
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key:
        raise SystemExit("Set ELEVENLABS_API_KEY.")
    args.work.mkdir(parents=True, exist_ok=True)
    data = content()
    for lang in args.lang or ["en", "ru", "uk"]:
        build(lang, data, args.work, key)


if __name__ == "__main__":
    main()
