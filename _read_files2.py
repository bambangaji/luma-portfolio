import os

files_to_read = [
    'src/services/auth.service.ts',
    'src/services/user-service.ts',
    'src/services/resume-service.ts',
    'src/router/index.tsx',
    'src/store/portfolio.store.ts',
    'src/store/user-slice.ts',
    'src/pages/auth/login-page.tsx',
    'src/pages/auth/register-page.tsx',
    'src/pages/searching-page.tsx',
    'src/pages/portfolio-builder-page.tsx',
    'src/components/user/user-list.tsx',
    'src/App.tsx',
    '.env',
    'docs/README.md',
    'src/data/template-json-classification.json',
    'src/services/portofolio-mapping-service.ts',
    'src/services/portofolio-merge.service.ts',
]

output = []
for f in files_to_read:
    if os.path.exists(f):
        try:
            with open(f, 'r', encoding='utf-8') as fp:
                content = fp.read()
            output.append(f"=== FILE: {f} ===\n{content}\n")
        except Exception as e:
            output.append(f"=== FILE: {f} === ERROR: {e}\n")
    else:
        output.append(f"=== FILE: {f} === NOT FOUND\n")

with open('_files_output2.txt', 'w', encoding='utf-8') as fp:
    fp.write('\n'.join(output))

print("Done!")