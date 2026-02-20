import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DISABLED = path.join(ROOT, '_disabled')

// create folder if not exists
if (!fs.existsSync(DISABLED)) {
  fs.mkdirSync(DISABLED)
}

// files & folders from the template that are NOT required
const CANDIDATES = [
  '.checkov.yml',
  '.licensed.yml',
  '.markdown-lint.yml',
  '.yaml-lint.yml',
  '.node-version',
  '.prettierrc.yml',
  '.prettierignore',
  '.gitattributes',
  '.vscode',
  'badges',
  '__fixtures__',
  '__tests__',
  'CODEOWNERS',
  'jest.config.js',
  'actionlint.yml'
]

// move helper
function move(item) {
  const src = path.join(ROOT, item)
  const dst = path.join(DISABLED, item)

  if (!fs.existsSync(src)) return

  console.log(`→ disabling: ${item}`)

  // ensure parent dir exists
  fs.mkdirSync(path.dirname(dst), { recursive: true })

  fs.renameSync(src, dst)
}

CANDIDATES.forEach(move)

console.log('\nDone. All non-essential template files moved to _disabled/')
