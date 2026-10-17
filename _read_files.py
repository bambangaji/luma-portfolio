import os
import json

files_to_read = [
    'src/interface/portofolio-json.interface.ts',
    'src/interface/resume-json.interface.ts',
    'src/services/landing-page-service.ts',
    'src/services/portofolio-merge.service.ts',
    'src/services/portofolio-mapping-service.ts',
    'src/store/portfolio.store.ts',
    'src/router/index.tsx',
    'src/App.tsx',
    'src/pages/auth/login-page.tsx',
    'src/pages/auth/register-page.tsx',
    'src/pages/auth/forgot-password-page.tsx',
    'src/pages/landing-page.tsx',
    'src/pages/searching-page.tsx',
    'src/pages/portfolio-builder-page.tsx',
    'src/components/user/user-list.tsx',
    'src/data/template-json-classification.json',
    'package.json',
    '.env',
    'docs/README.md',
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

with open('_files_output.txt', 'w', encoding='utf-8') as fp:
    fp.write('\n'.join(output))

print("Done! Output written to _files_output.txt")
print(f"Total files processed: {len(files_to_read)}")