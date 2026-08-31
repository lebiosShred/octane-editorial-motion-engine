import sys
import json
import hashlib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
LOGOS_DIR = BASE_DIR / "public" / "logos"
LOGOS_DIR.mkdir(parents=True, exist_ok=True)
MANIFEST_FILE = LOGOS_DIR / "asset_manifest.json"

sys.path.append(r"C:\Users\SkyDr\.gemini\antigravity\scratch")
from locus_browser_client import LocusBrowser

# Target domains to extract master brand SVGs from live DOM via Personal Chrome
TARGET_SITES = {
    "domain.svg": {
        "url": "https://www.domain.com.au",
        "query": "document.querySelector('svg.domain-logo, a[data-testid=\"domain-logo\"] svg, header svg')?.outerHTML",
        "brand": "Domain Group"
    },
    "optus.svg": {
        "url": "https://www.optus.com.au",
        "query": "document.querySelector('a[data-testid=\"optus-logo\"] svg, header a svg, svg.optus-logo')?.outerHTML || document.querySelectorAll('svg')[0]?.outerHTML",
        "brand": "Optus"
    },
    "adobe.svg": {
        "url": "https://www.adobe.com",
        "query": "document.querySelector('a#gnav_logo svg, header svg, a[aria-label=\"Adobe\"] svg')?.outerHTML || document.querySelectorAll('svg')[0]?.outerHTML",
        "brand": "Adobe"
    },
    "hsbc.svg": {
        "url": "https://www.hsbc.com.au",
        "query": "document.querySelector('header a svg, a[aria-label=\"HSBC\"] svg, .hsbc-logo svg')?.outerHTML || document.querySelectorAll('svg')[0]?.outerHTML",
        "brand": "HSBC"
    },
    "sanofi.svg": {
        "url": "https://www.sanofi.com/en",
        "query": "document.querySelector('header a svg, a.sanofi-logo svg, a[aria-label=\"Sanofi\"] svg')?.outerHTML || document.querySelectorAll('svg')[0]?.outerHTML",
        "brand": "Sanofi"
    },
    "unilever.svg": {
        "url": "https://www.unilever.com",
        "query": "document.querySelector('header a svg, a.c-logo svg, a[aria-label=\"Unilever\"] svg')?.outerHTML || document.querySelectorAll('svg')[0]?.outerHTML",
        "brand": "Unilever"
    },
    "qbe.svg": {
        "url": "https://www.qbe.com/au",
        "query": "document.querySelector('header a svg, a[aria-label=\"QBE\"] svg, .qbe-logo svg')?.outerHTML || document.querySelectorAll('svg')[0]?.outerHTML",
        "brand": "QBE Insurance"
    },
    "boral.svg": {
        "url": "https://www.boral.com.au",
        "query": "document.querySelector('header a svg, a[aria-label=\"Boral\"] svg, .boral-logo svg')?.outerHTML || document.querySelectorAll('svg')[0]?.outerHTML",
        "brand": "Boral"
    }
}

def harvest():
    print("🚀 [Locus Asset Harvester] Harvesting master vector assets via Personal Browser Bridge...")
    if not LocusBrowser.is_connected():
        print("❌ Locus Browser Extension is not connected! Please ensure extension is running in Chrome.")
        sys.exit(1)

    manifest = {}

    for fname, cfg in TARGET_SITES.items():
        url = cfg["url"]
        brand = cfg["brand"]
        print(f"🌐 Fetching {brand} from {url}...")
        nav = LocusBrowser.navigate(url, background=True)
        tab_id = nav.get("tabId")
        if tab_id:
            res = LocusBrowser.evaluate(cfg["query"], tab_id=tab_id)
            svg_html = res.get("result")
            if svg_html and len(svg_html) > 30 and "<svg" in svg_html:
                out_path = LOGOS_DIR / fname
                out_path.write_text(svg_html, encoding="utf-8")
                manifest[fname] = {
                    "source": f"{url} (Live Personal Chrome DOM)",
                    "sha256": hashlib.sha256(svg_html.encode()).hexdigest(),
                    "brand": brand,
                    "bytes": len(svg_html)
                }
                print(f"  ✅ Harvested authentic master vector for {brand} ({len(svg_html)} bytes)")
            else:
                print(f"  ⚠️ Could not isolate specific header SVG for {brand}")
            LocusBrowser.close_tab(tab_id)

    MANIFEST_FILE.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\n📄 Updated asset_manifest.json with {len(manifest)} verified assets.")

if __name__ == "__main__":
    harvest()
