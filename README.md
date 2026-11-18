# Outdraft for Windows and Linux

Outdraft helps with Dota 2 picks, bans and builds, with recommendations during the draft and the match.
The interface is in English, Russian and Ukrainian.

Website: [outdraft.org](https://outdraft.org)

## Download

- [Windows installer](https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/Outdraft-windows-x86_64.exe)
- [Linux AppImage](https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/Outdraft-linux-x86_64.AppImage)
- [All releases and release notes](https://github.com/vshtykhnov/outdraft-releases/releases)

## Install

On Windows, run `Outdraft-windows-x86_64.exe`. It installs Outdraft for your user only, without
administrator rights, and starts it. On Linux (Wayland), make the AppImage executable
(`chmod +x Outdraft-linux-x86_64.AppImage`) and run it.

The installer is not code-signed yet. If your browser or Windows warns about it, keep the file, then
choose **More info → Run anyway**. Each release links its VirusTotal scan.

On Windows, use Dota 2 in borderless-window or windowed mode. Restart Dota 2 once after the first run so
it loads the game integration. An internet connection is required for recommendations.

Step by step, including what to do if Dota 2 isn't found:
[Windows](https://outdraft.org/en/how-to-use/windows/) · [Linux](https://outdraft.org/en/how-to-use/linux/).

## Update

From 0.3.2 on, Outdraft updates itself: it downloads a new version in the background and installs it
when you close the app.

If you have 0.3.1 or older, from a ZIP or `.tar.gz` archive, install the latest version once as above.
Your settings are kept. Afterwards you can delete the old extracted folder.

## What Outdraft sends

Outdraft reads screen pixels, Dota's game state integration and portraits from Dota's files. It never reads game
memory or network traffic.

It sends your Steam account id, read from Dota, to its server to know which heroes you play, for the bans.

With **Help improve Outdraft** on (the default), it also sends:

- anonymous usage stats and crash reports;
- which match you are playing: the match id, your hero and side, and your Steam account, which the server keeps only
  as a one-way hash. The advice you were shown can then be checked against how the match went.

Match data is public in Dota. Turn the switch off in the settings and none of this is sent; your Steam id is then
used for the bans alone.
