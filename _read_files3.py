import os

files_to_read = [
    'src/services/auth.service.ts',
    'src/services/user-service.ts',
    'src/services/resume-service.ts',
    'src/router/index.tsx',
    'src/store/portfolio.store.ts',
    'src/store/user-slice.ts',
    'src/App.tsx',
    '.env',
    'docs/README.md',
]

for f in files_to_read:
    if os.path.exists(f):
        try:
            with open(f, 'r', encoding='utf-8') as fp:
                content = fp.read()
            print(f"=== FILE: {f} ===")
            print(content[:3000])  # Print first 3000 chars
            print()
        except Exception as e:
            print(f"=== FILE: {f} === ERROR: {e}")
    else:
        print(f"=== FILE: {f} === NOT FOUND")
    print("---END---")