import os
import json
import re

REPORT_PATH = "out/qa_report.json"
BEAT_ENGINE_PATH = "src/engine/BeatDirectorEngine.ts"

def auto_tune():
    if not os.path.exists(REPORT_PATH):
        print(f"{REPORT_PATH} not found. Run perceptual_frame_inspector.py first.")
        return

    with open(REPORT_PATH, "r") as f:
        report = json.load(f)

    if report["warnings_count"] == 0:
        print("✅ 100% of beats already have PASS status. No tuning needed.")
        return

    print(f"🔧 Found {report['warnings_count']} warning(s). Applying automated parameter tuning...")

    # Read BeatDirectorEngine.ts
    with open(BEAT_ENGINE_PATH, "r") as f:
        engine_code = f.read()

    for beat in report["beats_analyzed"]:
        if beat["beat_status"] == "WARNING":
            beat_id = beat["id"]
            print(f"Tuning {beat_id} ({beat['name']})...")
            
            # If beat_07 has contrast warning, bring camera closer for higher luminance
            if "beat_07" in beat_id:
                # Replace camera position for beat_07
                pattern = r"(id:\s*'beat_07_150_agents'[\s\S]*?camera:\s*\{[^}]*position:\s*\[)[^\]]*(\][^}]*\})"
                replacement = r"\g<1>1.6, 1.8, 5.6\g<2>"
                engine_code = re.sub(pattern, replacement, engine_code)

    with open(BEAT_ENGINE_PATH, "w") as f:
        f.write(engine_code)

    print("✅ Automated tuning applied to src/engine/BeatDirectorEngine.ts")

if __name__ == "__main__":
    auto_tune()
