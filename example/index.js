const { writeFileSync } = require('fs')
const { join } = require('path')

const { Pcb } = require('../')

const tracks = [
  {
    start: [61.0616, 36.8808],
    end: [61.0616, 34.3502],
    width: 0.254,
    layer: 'B.Cu',
    net: 1
  },
  {
    start: [61.0616, 34.5186],
    end: [62.23, 33.3502],
    width: 0.254,
    layer: 'B.Cu',
    net: 1
  },
  {
    start: [69.85, 33.3502],
    end: [70.993, 33.3502],
    width: 0.5,
    layer: 'B.Cu',
    net: 2
  },
  {
    start: [71.2216, 33.5788],
    end: [71.2216, 36.8808],
    width: 0.5,
    layer: 'B.Cu',
    net: 2
  },
  {
    start: [70.993, 33.3502],
    end: [71.2216, 33.5788],
    width: 0.5,
    layer: 'B.Cu',
    net: 2
  },
]


const pcb = Pcb({
  tracks
})

writeFileSync(
  join(__dirname, 'example.kicad_pcb'),
  pcb,
  'utf8'
)
