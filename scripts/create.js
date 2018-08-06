'use strict'
const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const rootDir = path.join(__dirname, '..')

const claspJSONPath = path.join(rootDir, '.clasp.json')
// run clasp create if have not .clasp.json
if (!fs.existsSync(claspJSONPath)) {
  console.log('Create .clasp.json')
  const clasp = require.resolve('.bin/clasp')
  spawn.sync(clasp, ['create'].concat(process.argv.slice(2)), {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true,
  })
}
// modify .clasp.json if it exists
if (fs.existsSync(claspJSONPath)) {
  console.log('Add dist directory to .clasp.json')
  const claspJSON = require(claspJSONPath)
  claspJSON['rootDir'] = 'dist'
  fs.writeFileSync(claspJSONPath, JSON.stringify(claspJSON, null, 4), 'utf-8')
}
// cp .env.example .env
if (!fs.existsSync(path.join(rootDir, '.env'))) {
  console.log('Copy .env.example to .env')
  fs.copyFileSync(path.join(rootDir, '.env.example'), path.join(rootDir, '.env'))
}
