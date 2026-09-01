import os

def search_files(base_dir, query):
    matches = []
    for root, dirs, files in os.walk(base_dir):
        if any(skip in root for skip in ['.git', 'node_modules', '.venv', 'dist', 'build']):
            continue
        for f in files:
            if f.endswith(('.py', '.ts', '.js', '.md', '.json', '.xml', '.html')):
                path = os.path.join(root, f)
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
                        content = fh.read()
                        if query.lower() in content.lower():
                            matches.append((path, content.lower().count(query.lower())))
                except Exception:
                    pass
    return matches

res = search_files(r'C:\Users\SkyDr\.gemini', 'bridge')
print(f'Found {len(res)} files with "bridge":')
for p, c in res[:30]:
    print(f'  {p} ({c} occurrences)')

res_ext = search_files(r'C:\Users\SkyDr\.gemini', 'extension')
print(f'\nFound {len(res_ext)} files with "extension":')
for p, c in res_ext[:30]:
    print(f'  {p} ({c} occurrences)')
