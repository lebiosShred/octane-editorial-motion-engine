import os
import json
import asyncio
import subprocess
import urllib.request
from typing import Dict, Any, Optional
from playwright.async_api import async_playwright

class AutoStreamResolver:
    """
    Automated stream & subtitle resolver with multi-provider fallback (Miruro / Anisuge / Pahe / HiAnime).
    """
    def __init__(self, work_dir: str = "."):
        self.work_dir = work_dir
        os.makedirs(self.work_dir, exist_ok=True)

    async def resolve_episode(self, ep_num: int) -> Dict[str, Any]:
        """
        Resolve clean 1080p stream and subtitle for 86 Eighty-Six episode N.
        """
        # Determine URLs
        if ep_num <= 11:
            miruro_url = f"https://www.miruro.to/watch/116589/86-eighty-six?ep={ep_num}"
            anisuge_url = f"https://anisuge.tv/watch/86-nqcoh/ep-{ep_num}"
        else:
            miruro_url = f"https://www.miruro.to/watch/131586/86-eighty-six-part-2?ep={ep_num - 11}"
            anisuge_url = f"https://anisuge.tv/watch/86-part-2-2x6y/ep-{ep_num - 11}"

        stream_info = {"stream_url": None, "subtitles_url": None, "referer": "https://www.miruro.to/"}

        print(f"[Resolver] Resolving Episode {ep_num:02d} from Miruro ({miruro_url})...")
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(
                    headless=True,
                    args=["--no-sandbox", "--disable-blink-features=AutomationControlled"]
                )
                context = await browser.new_context(
                    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
                )
                page = await context.new_page()

                async def on_response(resp):
                    r_url = resp.url
                    if (".m3u8" in r_url or "pl.m3u8" in r_url or "master.m3u8" in r_url) and not stream_info["stream_url"]:
                        stream_info["stream_url"] = r_url
                        print(f"  ✔ Found Stream: {r_url[:80]}...")
                    if (".vtt" in r_url or "sub.vtt" in r_url or "subtitles" in r_url) and not stream_info["subtitles_url"]:
                        if "eng" in r_url.lower() or "en" in r_url.lower() or "sub.vtt" in r_url:
                            stream_info["subtitles_url"] = r_url
                            print(f"  ✔ Found Subtitles: {r_url[:80]}...")

                page.on("response", on_response)
                await page.goto(miruro_url, wait_until="domcontentloaded")
                await page.wait_for_timeout(4000)

                # If video player needs click
                if not stream_info["stream_url"]:
                    try:
                        btn = await page.query_selector(".player-container, video, #player, .play-button")
                        if btn:
                            await btn.click()
                            await page.wait_for_timeout(3000)
                    except:
                        pass

                await browser.close()
        except Exception as e:
            print(f"[Resolver Error] Miruro resolve error: {e}")

        # Fallback to Anisuge if needed
        if not stream_info["stream_url"]:
            print(f"[Resolver] Falling back to Anisuge mirror for Episode {ep_num:02d}...")
            try:
                async with async_playwright() as p:
                    browser = await p.chromium.launch(
                        headless=True,
                        args=["--no-sandbox", "--disable-blink-features=AutomationControlled"]
                    )
                    context = await browser.new_context(
                        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
                    )
                    page = await context.new_page()

                    async def on_anisuge_resp(resp):
                        if "getSources" in resp.url:
                            try:
                                data = await resp.json()
                                if "sources" in data and "file" in data["sources"]:
                                    stream_info["stream_url"] = data["sources"]["file"]
                                if "tracks" in data:
                                    for track in data["tracks"]:
                                        if track.get("label") == "English" or track.get("default"):
                                            stream_info["subtitles_url"] = track.get("file")
                            except:
                                pass

                    page.on("response", on_anisuge_resp)
                    await page.goto(anisuge_url, wait_until="domcontentloaded")
                    await page.wait_for_timeout(3000)
                    await browser.close()
                    stream_info["referer"] = "https://megaplay.buzz/"
            except Exception as e:
                print(f"[Resolver Error] Anisuge fallback error: {e}")

        return stream_info
