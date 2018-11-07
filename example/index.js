const { writeFileSync } = require('fs')
const { join } = require('path')

const { Pcb } = require('../')

const page = {
  type: 'A4',
  title: 'Example'
}

const tracks = [
  {
    start: [61.0616, 36.8808],
    end: [61.0616, 34.3502],
    width: 0.254,
    layer: 'B.Cu',
    net: '+5V'
  },
  {
    start: [61.0616, 34.5186],
    end: [62.23, 33.3502],
    width: 0.254,
    layer: 'B.Cu',
    net: '+5V'
  },
  {
    start: [69.85, 33.3502],
    end: [70.993, 33.3502],
    width: 0.5,
    layer: 'B.Cu',
    net: 'GND'
  },
  {
    start: [71.2216, 33.5788],
    end: [71.2216, 36.8808],
    width: 0.5,
    layer: 'B.Cu',
    net: 'GND'
  },
  {
    start: [70.993, 33.3502],
    end: [71.2216, 33.5788],
    width: 0.5,
    layer: 'B.Cu',
    net: 'GND'
  },
]

const nets = [
  {
    name: '+5V'
  },
  {
    name: 'GND'
  }
]

const net_classes = [
  {
    name: 'Default',
    description: 'default net class',
    clearance: 0.254,
    trace_width: 0.254,
    via_dia: 0.6858,
    via_drill: 0.3302,
    nets: []
  },
  {
    name: 'Power',
    description: 'default net class',
    clearance: 0.254,
    trace_width: 0.5,
    via_dia: 1.2,
    via_drill: 0.635,
    nets: [
      '+5V',
      'GND'
    ]
  },
]

const zones = [
  {
    net: 'GND',
    layer: 'B.Cu',
    hatch: { edge: 0.508 },
    connect_pads: {
      clearance: 0.2
    },
    min_thickness: 0.1778,
    fill: {
      arc_segments: 16,
      thermal_gap: 0.254,
      thermal_bridge_width: 0.4064
    },
    polygon: {
      pts: [
        { x: 59, y: 30 },
        { x: 73, y: 30 },
        { x: 73, y: 41 },
        { x: 59, y: 41 }
      ]
    }
  }
]

const pcb = Pcb({
  page,
  tracks,
  nets,
  net_classes,
  zones
})

writeFileSync(
  join(__dirname, 'example.kicad_pcb'),
  pcb,
  'utf8'
)
