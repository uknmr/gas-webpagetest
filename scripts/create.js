'use strict'
const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const rootDir = path.join(__dirname, '..')

const claspJSONPath = path.join(rootDir, '.clasp.json')
// run clasp create if have not .clasp.json
if (!fs.existsSync(claspJSONPath)) {
  const clasp = require.resolve('.bin/clasp')
  const [title, parentId] = process.argv.slice(2)
  spawn.sync(clasp, ['create', '--title', title, '--parentId', parentId], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true,
  })
  console.log('✓ Create .clasp.json')
} else {
  console.log('⚠ .clasp.json is already exists')
}
// modify .clasp.json if it exists
if (fs.existsSync(claspJSONPath)) {
  const claspJSON = require(claspJSONPath)
  if (!claspJSON['rootDir']) {
    claspJSON['rootDir'] = 'dist'
    fs.writeFileSync(claspJSONPath, JSON.stringify(claspJSON, null, 4), 'utf-8')
    console.log('✓ Add dist directory to .clasp.json')
  } else {
    console.log('⚠ .clasp.json already has rootDir')
  }
}
// cp .env.example .env
if (!fs.existsSync(path.join(rootDir, '.env'))) {
  fs.copyFileSync(path.join(rootDir, '.env.example'), path.join(rootDir, '.env'))
  console.log('✓ Copy .env.example to .env')
} else {
  console.log('⚠ .env is already exists')
}
