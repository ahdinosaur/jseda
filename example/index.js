const dent = require('endent')

const page = {
  type: 'A4',
  title: 'Example'
}

const tracks = [
  {
    start: { x: 61.0616, y: 36.8808 },
    end: { x: 61.0616, y: 34.3502 },
    width: 0.254,
    layer: 'B.Cu',
    net: '+5V'
  },
  {
    start: { x: 61.0616, y: 34.5186 },
    end: { x: 62.23, y: 33.3502 },
    width: 0.254,
    layer: 'B.Cu',
    net: '+5V'
  },
  {
    start: { x: 69.85, y: 33.3502 },
    end: { x: 70.993, y: 33.3502 },
    width: 0.5,
    layer: 'B.Cu',
    net: 'GND'
  },
  {
    start: { x: 71.2216, y: 33.5788 },
    end: { x: 71.2216, y: 36.8808 },
    width: 0.5,
    layer: 'B.Cu',
    net: 'GND'
  },
  {
    start: { x: 70.993, y: 33.3502 },
    end: { x: 71.2216, y: 33.5788 },
    width: 0.5,
    layer: 'B.Cu',
    net: 'GND'
  },
]

const modules = [
  {
    component: 'PinHeader_1x04_P254mm_Vertical',
    at: {
      x: 50,
      y: 50,
      angle: 210
    },
    pads: [
      { net: 'GND' },
      { net: 'GND' },
      { net: '+5V' },
      { net: '+5V' }
    ]
  }
]

const fab_notes = dent`
  FABRICATION NOTES

  1. THIS IS A 2 LAYER BOARD.
  2. EXTERNAL LAYERS SHALL HAVE 1 OZ COPPER.
  3. MATERIAL: FR4 AND 0.062 INCH +/- 10% THICK.
  4. BOARDS SHALL BE ROHS COMPLIANT.
  5. MANUFACTURE IN ACCORDANCE WITH IPC-6012 CLASS 2
  6. MASK: BOTH SIDES OF THE BOARD SHALL HAVE SOLDER MASK (ANY COLOR) OVER BARE COPPER.
  7. SILK: BOTH SIDES OF THE BOARD SHALL HAVE WHITE SILKSCREEN. DO NOT PLACE SILK OVER BARE COPPER.
  8. FINISH: ENIG.
  9. MINIMUM TRACE WIDTH - 0.006 INCH.
     MINIMUM SPACE - 0.006 INCH.
     MINIMUM HOLE DIA - 0.013 INCH.
  10. MAX HOLE PLACEMENT TOLERANCE OF +/- 0.003 INCH.
  11. MAX HOLE DIAMETER TOLERANCE OF +/- 0.003 INCH AFTER PLATING.
`

const graphics = [
  {
    type: 'text',
    content: fab_notes,
    at: {
      x: 113.4872,
      y: 93.2688
    },
    layer: 'Dwgs.User',
    effects: {
      font: {
        size: {
          x: 2.54,
          y: 2.54
        },
        thickness: 0.254
      },
      justify: 'left'
    }
  },
  {
    type: 'text',
    content: 'TEST',
    at: {
      x: 62,
      y: 31
    },
    layer: 'F.Cu',
    effects: {
      font: {
        size: {
          x: 1.5,
          y: 1.5
        },
        thickness: 0.3
      }
    }
  },
  {
    type: 'line',
    start: { x: 58, y: 42 },
    end: { x: 58, y: 29 },
    angle: 90,
    layer: 'Edge.Cuts',
    width: 0.15
  },
  {
    type: 'line',
    start: { x: 74, y: 42 },
    end: { x: 58, y: 42 },
    angle: 90,
    layer: 'Edge.Cuts',
    width: 0.15
  },
  {
    type: 'line',
    start: { x: 74, y: 29 },
    end: { x: 74, y: 42 },
    angle: 90,
    layer: 'Edge.Cuts',
    width: 0.15
  },
  {
    type: 'line',
    start: { x: 58, y: 29 },
    end: { x: 74, y: 29 },
    angle: 90,
    layer: 'Edge.Cuts',
    width: 0.15
  }
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

module.exports = {
  graphics,
  modules,
  nets,
  net_classes,
  page,
  tracks,
  zones
}
