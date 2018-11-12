const CENTER = { x: 150, y: 100 }
const HEADER_RADIUS = 15
const CUT_RADIUS = 20
const CUT_SIDES = 6

const HeaderComponent = require('./header')

module.exports = {
  general: {
    page: 'A4',
    title: 'Example',
    area: [
      104.572999,
      74.854999,
      178.510001,
      123.265001
    ],
    thickness: 1.6,
    setup: {
      last_trace_width: 0.254,
      user_trace_width: [
        0.1524,
        0.254,
        0.3302,
        0.508,
        0.762,
        1.27
      ],
      trace_clearance: 0.254,
      zone_clearance: 0.508,
      zone_45_only: 'no',
      trace_min: 0.1524,
      segment_width: 0.1524,
      edge_width: 0.1524,
      via_size: 0.6858,
      via_drill: 0.3302,
      via_min_size: 0.6858,
      via_min_drill: 0.3302,
      user_via: [
        [
          0.6858,
          0.3302
        ],
        [
          0.762,
          0.4064
        ],
        [
          0.8636,
          0.508
        ]
      ],
      uvia_size: 0.6858,
      uvia_drill: 0.3302,
      uvias_allowed: 'no',
      uvia_min_size: 0,
      uvia_min_drill: 0,
      pcb_text_width: 0.1524,
      pcb_text_size: [
        1.016,
        1.016
      ],
      mod_edge_width: 0.1524,
      mod_text_size: [
        1.016,
        1.016
      ],
      mod_text_width: 0.1524,
      pad_size: [
        1.524,
        1.524
      ],
      pad_drill: 0.762,
      pad_to_mask_clearance: 0.0762,
      solder_mask_min_width: 0.1016,
      pad_to_paste_clearance: -0.0762,
      aux_axis_origin: [
        0,
        0
      ],
      visible_elements: 'FFFEDF7D',
      pcbplotparams: {
        layerselection: '0x310fc_80000001',
        usegerberextensions: 'true',
        excludeedgelayer: 'true',
        linewidth: 0.1,
        plotframeref: 'false',
        viasonmask: 'false',
        mode: 1,
        useauxorigin: 'false',
        hpglpennumber: 1,
        hpglpenspeed: 20,
        hpglpendiameter: 15,
        hpglpenoverlay: 2,
        psnegative: 'false',
        psa4output: 'false',
        plotreference: 'true',
        plotvalue: 'true',
        plotinvisibletext: 'false',
        padsonsilk: 'false',
        subtractmaskfromsilk: 'false',
        outputformat: 1,
        mirror: 'false',
        drillshape: 0,
        scaleselection: 1,
        outputdirectory: 'gerbers'
      }
    },
  },
  layers: {
    '0': [ 'F.Cu', 'signal' ],
    '31': [ 'B.Cu', 'signal' ],
    '34': [ 'B.Paste', 'user' ],
    '35': [ 'F.Paste', 'user' ],
    '36': [ 'B.SilkS', 'user' ],
    '37': [ 'F.SilkS', 'user' ],
    '38': [ 'B.Mask', 'user' ],
    '39': [ 'F.Mask', 'user' ],
    '40': [ 'Dwgs.User', 'user' ],
    '44': [ 'Edge.Cuts', 'user' ],
    '46': [ 'B.CrtYd', 'user' ],
    '47': [ 'F.CrtYd', 'user' ],
    '48': [ 'B.Fab', 'user' ],
    '49': [ 'F.Fab', 'user' ]
  },
  nets: [
    {
      name: '+5V'
    },
    {
      name: 'GND'
    },
    {
      name: 'DATA_1_TO_DATA_2'
    },
    {
      name: 'CLOCK_1_TO_CLOCK_2'
    },
    {
      name: 'DATA_2_TO_DATA_3'
    },
    {
      name: 'CLOCK_2_TO_CLOCK_3'
    }
  ],
  net_classes: [
    {
      name: 'Default',
      description: 'default net class',
      clearance: 0.254,
      trace_width: 0.254,
      via_dia: 0.6858,
      via_drill: 0.3302,
      uvia_dia: 0.6858,
      uvia_drill: 0.3302,
      add_net: [
        'DATA_1_TO_DATA_2',
        'CLOCK_1_TO_CLOCK_2',
        'DATA_2_TO_DATA_3',
        'CLOCK_2_TO_CLOCK_3'
      ]
    },
    {
      name: 'Power',
      description: 'net class for high-power',
      clearance: 0.5,
      trace_width: 1.7,
      via_dia: 1.7,
      via_drill: 0.8,
      uvia_dia: 1.7,
      uvia_drill: 0.8,
      add_net: [
        '+5V',
        'GND'
      ]
    }
  ],
  modules: [
    {
      component: HeaderComponent,
      at: {
        x: CENTER.x,
        y: CENTER.y,
        angle: -(1/4) * 360
      },
      graphics: {
        reference: {
          content: 'J1'
        },
        value: {
          content: 'IO'
        },
      },
      pads: [
        { net: { name: 'GND' } },
        { net: { name: 'DATA_1_TO_DATA_2' } },
        { net: { name: 'CLOCK_1_TO_CLOCK_2' } },
        { net: { name: '+5V' } }
      ]
    },
    {
      component: HeaderComponent,
      at: {
        x: CENTER.x + HEADER_RADIUS * Math.cos(-(1/4) * 2 * Math.PI),
        y: CENTER.y + HEADER_RADIUS * Math.sin(-(1/4) * 2 * Math.PI),
        angle: -(1/4) * 360
      },
      graphics: {
        reference: {
          content: 'J2'
        },
        value: {
          content: 'ARM_1'
        },
      },
      pads: [
        { net: { name: 'GND' } },
        { net: { name: 'DATA_1_TO_DATA_2' } },
        { net: { name: 'CLOCK_1_TO_CLOCK_2' } },
        { net: { name: '+5V' } }
      ]
    },
    {
      component: HeaderComponent,
      name: 'ARM_2',
      at: {
        x: CENTER.x + HEADER_RADIUS * Math.cos(-(1/4 + 1/3) * 2 * Math.PI),
        y: CENTER.y + HEADER_RADIUS * Math.sin(-(1/4 + 1/3) * 2 * Math.PI),
        angle: (-1/4 + 1/3) * 360 + 180
      },
      graphics: {
        reference: {
          content: 'J3'
        },
        value: {
          content: 'ARM_2'
        },
      },
      pads: [
        { net: { name: 'GND' } },
        { net: { name: 'DATA_2_TO_DATA_3' } },
        { net: { name: 'CLOCK_2_TO_CLOCK_3' } },
        { net: { name: '+5V' } }
      ]
    },
    {
      component: HeaderComponent,
      at: {
        x: CENTER.x + HEADER_RADIUS * Math.cos(-(1/4 + 2/3) * 2 * Math.PI),
        y: CENTER.y + HEADER_RADIUS * Math.sin(-(1/4 + 2/3) * 2 * Math.PI),
        angle: (-1/4 + 2/3) * 360
      },
      graphics: {
        reference: {
          content: 'J4'
        },
        value: {
          content: 'ARM_3'
        },
      },
      pads: [
        { net: { name: 'GND' } },
        { net: { name: 'DATA_2_TO_DATA_3' } },
        { net: { name: 'CLOCK_2_TO_CLOCK_3' } },
        { net: { name: '+5V' } }
      ]
    }
  ],
  graphics: [
    ...range(CUT_SIDES).map(i => ({
      type: 'line',
      start: {
        x: CENTER.x + CUT_RADIUS * Math.cos((i / CUT_SIDES) * 2 * Math.PI),
        y: CENTER.y + CUT_RADIUS * Math.sin((i / CUT_SIDES) * 2 * Math.PI)
      },
      end: {
        x: CENTER.x + CUT_RADIUS * Math.cos(((i + 1) / CUT_SIDES) * 2 * Math.PI),
        y: CENTER.y + CUT_RADIUS * Math.sin(((i + 1) / CUT_SIDES) * 2 * Math.PI)
      },
      angle: 90,
      layer: 'Edge.Cuts',
      width: 0.15
    }))
  ],
  zones: [
    {
      net: { name: 'GND' },
      layer: 'F.Cu',
      hatch: [ 'edge', 0.508 ],
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
        pts: {
          xy: [
            {
              x: 170,
              y: 100
            },
            {
              x: 160,
              y: 117.32050807568876
            },
            {
              x: 140,
              y: 117.32050807568878
            },
            {
              x: 130,
              y: 100
            },
            {
              x: 140,
              y: 82.67949192431124
            },
            {
              x: 160,
              y: 82.67949192431124
            },
            {
              x: 170,
              y: 100
            }
          ]
        }
      }
    }
  ]
}

function range (n) {
  return [...Array(n).keys()]
}
