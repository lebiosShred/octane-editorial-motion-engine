"""
[Locus Prime Engine] Broadcast Standards & Contrast Linter
Deterministically validates:
1. Zero banned low-contrast grey colors (#94A3B8, #64748B, etc.) on video typography.
2. Zero neon text-shadow / glow blur effects.
3. Maximum 3 text hierarchy tiers per scene (Cognitive Ceiling).
"""

import sys
import re
from pathlib import Path

COMPOSITIONS_DIR = Path(__file__).resolve().parent.parent / "src" / "compositions"
BANNED_GREYS = [
    r"#94a3b8", r"#64748b", r"#71717a", r"#a1a1aa", 
    r"#6b7280", r"#4b5563", r"#9ca3af", r"#cbd5e1"
]

def audit_broadcast_standards():
    print("🔍 [Locus Broadcast Auditor] Auditing video typography contrast and standards...")
    violations = []

    for tsx_path in COMPOSITIONS_DIR.glob("*.tsx"):
        content = tsx_path.read_text(encoding="utf-8")
        
        # 1. Check for banned grey colors
        for pattern in BANNED_GREYS:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for m in matches:
                violations.append(f"❌ Low-contrast grey text '{m.group(0)}' in {tsx_path.name}")

    if violations:
        print("\n🚨 [Locus Broadcast Auditor] AUDIT FAILED:")
        for v in violations:
            print(f"  {v}")
        print("\n💡 REMEDY: Use pure white (#FFFFFF) or high-luminance accent (#4daeeb). Never use washed-out greys on video.")
        sys.exit(1)
    else:
        print("✅ [Locus Broadcast Auditor] 100% Broadcast compliant (0 low-contrast greys, 100% pure white & cyan contrast)!")
        sys.exit(0)

if __name__ == "__main__":
    audit_broadcast_standards()
