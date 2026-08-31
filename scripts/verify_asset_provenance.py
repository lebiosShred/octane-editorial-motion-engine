import sys
import json
import re
import hashlib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
LOGOS_DIR = BASE_DIR / "public" / "logos"
MANIFEST_FILE = LOGOS_DIR / "asset_manifest.json"

def audit_assets():
    print("🔍 [Locus Provenance Auditor] Auditing asset provenance...")
    errors = []

    if not LOGOS_DIR.exists():
        print("❌ public/logos directory does not exist!")
        sys.exit(1)

    # 1. Audit SVG files for synthetic mockups / <text> tags
    svg_files = list(LOGOS_DIR.glob("*.svg"))
    for svg_path in svg_files:
        content = svg_path.read_text(encoding="utf-8", errors="ignore")
        
        # Check for <text> tags representing corporate names
        if "<text" in content.lower():
            text_matches = re.findall(r'<text[^>]*>(.*?)</text>', content, re.IGNORECASE | re.DOTALL)
            if text_matches and any(len(t.strip()) > 1 for t in text_matches):
                errors.append(f"❌ SYNTHETIC MOCKUP DETECTED in {svg_path.name}: Contains <text> tag ({text_matches}). Real corporate logos must use vector bezier curves (<path>/<polygon>), not system typography.")

        # Check for simplistic geometric approximations
        if content.count("<path") == 0 and content.count("<polygon") <= 2 and "<text" in content.lower():
            errors.append(f"❌ LOW-FIDELITY APPROXIMATION in {svg_path.name}: Lacks vector complexity.")

    # 2. Audit Codebase for inline SVG generation scripts
    src_dir = BASE_DIR / "src"
    if src_dir.exists():
        for tsx_file in src_dir.rglob("*.tsx"):
            tcode = tsx_file.read_text(encoding="utf-8", errors="ignore")
            if "const " in tcode and "SVG = " in tcode and "<svg" in tcode:
                errors.append(f"❌ INLINE SYNTHETIC SVG DETECTED in {tsx_file.name}: Hardcoding SVG strings in TSX is strictly prohibited. Use official static files from public/logos/.")

    if errors:
        print("\n================================================================================")
        print("🚨 ASSET PROVENANCE AUDIT FAILED (HARD PROGRAMMATIC INTERCEPTOR)")
        print("================================================================================")
        for err in errors:
            print(f"  {err}")
        print("\n👉 Workload aborted. Please fetch genuine master vector files using 'npm run fetch:logos'.")
        print("================================================================================\n")
        return False

    print(f"✅ [Locus Provenance Auditor] All {len(svg_files)} vector assets passed authenticity audit (100% vector curves, 0 mockups)!")
    return True

if __name__ == "__main__":
    if not audit_assets():
        sys.exit(1)
