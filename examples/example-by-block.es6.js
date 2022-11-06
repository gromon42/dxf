import fs from 'fs'
import { join } from 'path'

import { Helper } from '../src'

const helper = new Helper(
  fs.readFileSync('./test/resources/NET-Architecture-Tm-53.dxf', 'utf-8'),
  { byBlock: true },
)

// The parsed entities
const { blocks, entities } = helper.parsed
console.log(`parsed: ${blocks.length} blocks, ${entities.length} entities.\n`)

// Denormalised blocks inserted with transforms applied
console.log(`denormalised: ${helper.denormalised.length} entities.\n`)

// Group entities by layer. Returns an object with layer names as
// keys to arrays of entities.
const groups = helper.groups
console.log('grouped entities')
console.log('----------------')
Object.keys(groups).forEach((layer) => {
  console.log(`${layer}: ${groups[layer].length}`)
})
console.log('\n')

// Write the SVG
const svgs = helper.toSVG()

svgs.map((svg, i) => {
  fs.writeFileSync(join(__dirname, `/example.es6-${i}.svg`), svg, 'utf-8')
  console.log(`SVG ${i + 1} written`)
})
