const assert = require('assert')
const dent = require('endent')

const KISYS3DMOD = process.env.KISYS3DMOD || '/usr/share/kicad/modules/packages3d/'

const NOW = (Date.now() / 1000).toString(16).substring(0, 8)
const NEWLINE = 'NEWLINE_NEWLINE_NEWLINE'

module.exports = {
  Pcb
}

function Pcb (options) {
  var {
    modules = [],
    nets = [],
    net_classes = [],
    page = {},
    tracks = [],
    zones = []
  } = options

  nets.unshift({ name: '""' })

  return dent`
    (kicad_pcb
      ${Header()}
      ${General({
        modules,
        nets,
        tracks,
        zones
      })}
      ${Page(page)}
      ${Layers({})}
      ${Setup({})}
      ${Nets({
        nets,
        net_classes
      })}
      ${Modules({
        modules,
        nets
      })}
      ${Graphics({})}
      ${Tracks({
        tracks,
        nets
      })}
      ${Zones({
        nets,
        zones
      })}
    )
  `
  // hack to have string '\n' in output s-expressionsto have string '\n' in output s-expressions
  .replace(new RegExp(NEWLINE, 'g'), '\\n')
}

function Header () {
  return dent`
    (version 4)
    (host pcbnew "kicad-js")
  `
}

function General (options) {
  const {
    modules,
    nets,
    tracks,
    zones
  } = options

  return dent`
    (general
      (links 0)
      (no_connects 0)
      (area 104.572999 74.854999 178.510001 123.265001)
      (thickness 1.6)
      (drawings 6)
      (tracks ${tracks.length})
      (zones ${zones.length})
      (modules ${modules.length})
      (nets ${nets.length})
    )
  `
}

function Page (options) {
  return dent`
    (page ${options.type || 'A4'})
    (title_block
      (title ${options.title || 'untitled'})
    )
  `
}

function Layers (options) {
  return dent`
    (layers
      (0 F.Cu signal)
      (31 B.Cu signal)
      (34 B.Paste user)
      (35 F.Paste user)
      (36 B.SilkS user)
      (37 F.SilkS user)
      (38 B.Mask user)
      (39 F.Mask user)
      (40 Dwgs.User user)
      (44 Edge.Cuts user)
      (46 B.CrtYd user)
      (47 F.CrtYd user)
      (48 B.Fab user)
      (49 F.Fab user)
    )
  `
}

function Setup (options) {
  return dent`
    (setup
      (last_trace_width 0.254)
      (user_trace_width 0.1524)
      (user_trace_width 0.254)
      (user_trace_width 0.3302)
      (user_trace_width 0.508)
      (user_trace_width 0.762)
      (user_trace_width 1.27)
      (trace_clearance 0.254)
      (zone_clearance 0.508)
      (zone_45_only no)
      (trace_min 0.1524)
      (segment_width 0.1524)
      (edge_width 0.1524)
      (via_size 0.6858)
      (via_drill 0.3302)
      (via_min_size 0.6858)
      (via_min_drill 0.3302)
      (user_via 0.6858 0.3302)
      (user_via 0.762 0.4064)
      (user_via 0.8636 0.508)
      (uvia_size 0.6858)
      (uvia_drill 0.3302)
      (uvias_allowed no)
      (uvia_min_size 0)
      (uvia_min_drill 0)
      (pcb_text_width 0.1524)
      (pcb_text_size 1.016 1.016)
      (mod_edge_width 0.1524)
      (mod_text_size 1.016 1.016)
      (mod_text_width 0.1524)
      (pad_size 1.524 1.524)
      (pad_drill 0.762)
      (pad_to_mask_clearance 0.0762)
      (solder_mask_min_width 0.1016)
      (pad_to_paste_clearance -0.0762)
      (aux_axis_origin 0 0)
      (visible_elements FFFEDF7D)
      (pcbplotparams
        (layerselection 0x310fc_80000001)
        (usegerberextensions true)
        (excludeedgelayer true)
        (linewidth 0.100000)
        (plotframeref false)
        (viasonmask false)
        (mode 1)
        (useauxorigin false)
        (hpglpennumber 1)
        (hpglpenspeed 20)
        (hpglpendiameter 15)
        (hpglpenoverlay 2)
        (psnegative false)
        (psa4output false)
        (plotreference true)
        (plotvalue true)
        (plotinvisibletext false)
        (padsonsilk false)
        (subtractmaskfromsilk false)
        (outputformat 1)
        (mirror false)
        (drillshape 0)
        (scaleselection 1)
        (outputdirectory gerbers))
    )
  `
}

function Nets (options) {
  const {
    nets,
    net_classes
  } = options

  return dent`
    ${nets
    .map((net, net_index) => dent`
      (net ${net_index} ${net.name})
    `)
    .join('\n')
    }
    ${net_classes
    .map(net_class => dent`
      (net_class ${net_class.name} "${net_class.description}"
        (clearance ${net_class.clearance})
        (trace_width ${net_class.trace_width})
        (via_dia ${net_class.via_dia})
        (via_drill ${net_class.via_drill})
        (uvia_dia ${net_class.via_dia})
        (uvia_drill ${net_class.via_drill})
        ${net_class.nets
        .map(net => dent`
          (add_net ${net})
        `)
        .join('\n')
        }
      )
    `)
    .join('\n')
    }
  `
}

const components = {
  PinHeader_1x04_P254mm_Vertical
}

function Modules (options) {
  const {
    modules,
    nets
  } = options

  return modules
    .map((module, module_index) => {
      const Component = components[module.component]
      assert.ok(Component, `modules[${module_index}].component is not a valid component: ${module.component}`)

      const pads = module.pads.map((pad, pad_index) => {
        const net_index = nets.findIndex(net => net.name === pad.net)
        assert(net_index > 0, `modules[${module_index}].pads[${pad_index}].net not found: ${pad.net}`)

        return Object.assign({}, pad, {
          net_index
        })
      })

      module = Object.assign({}, module, { pads })

      return Component(module)
    })
    .join('\n')
}

// 
// https://github.com/KiCad/kicad-footprints/blob/master/Connector_PinHeader_2.54mm.pretty/PinHeader_1x04_P2.54mm_Vertical.kicad_mod
//
function PinHeader_1x04_P254mm_Vertical (module) {
  return dent`
    (module
      PinHeader_1x04_P2.54mm_Vertical
      (layer F.Cu)
      (tedit 59FED5CC)
      (at ${module.position.x} ${module.position.y} ${module.rotation})
      (descr "Through hole straight pin header, 1x04, 2.54mm pitch, single row")
      (tags "Through hole pin header THT 1x04 2.54mm single row")
      (fp_text reference REF** (at 0 -2.33) (layer F.SilkS)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (fp_text value PinHeader_1x04_P2.54mm_Vertical (at 0 9.95) (layer F.Fab)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (fp_line (start -0.635 -1.27) (end 1.27 -1.27) (layer F.Fab) (width 0.1))
      (fp_line (start 1.27 -1.27) (end 1.27 8.89) (layer F.Fab) (width 0.1))
      (fp_line (start 1.27 8.89) (end -1.27 8.89) (layer F.Fab) (width 0.1))
      (fp_line (start -1.27 8.89) (end -1.27 -0.635) (layer F.Fab) (width 0.1))
      (fp_line (start -1.27 -0.635) (end -0.635 -1.27) (layer F.Fab) (width 0.1))
      (fp_line (start -1.33 8.95) (end 1.33 8.95) (layer F.SilkS) (width 0.12))
      (fp_line (start -1.33 1.27) (end -1.33 8.95) (layer F.SilkS) (width 0.12))
      (fp_line (start 1.33 1.27) (end 1.33 8.95) (layer F.SilkS) (width 0.12))
      (fp_line (start -1.33 1.27) (end 1.33 1.27) (layer F.SilkS) (width 0.12))
      (fp_line (start -1.33 0) (end -1.33 -1.33) (layer F.SilkS) (width 0.12))
      (fp_line (start -1.33 -1.33) (end 0 -1.33) (layer F.SilkS) (width 0.12))
      (fp_line (start -1.8 -1.8) (end -1.8 9.4) (layer F.CrtYd) (width 0.05))
      (fp_line (start -1.8 9.4) (end 1.8 9.4) (layer F.CrtYd) (width 0.05))
      (fp_line (start 1.8 9.4) (end 1.8 -1.8) (layer F.CrtYd) (width 0.05))
      (fp_line (start 1.8 -1.8) (end -1.8 -1.8) (layer F.CrtYd) (width 0.05))
      (pad 1 thru_hole rect (at 0 0) (size 1.7 1.7) (drill 1.0)
        (layers *.Cu *.Mask)
        (net ${module.pads[0].net_index} ${module.pads[0].net})
      )
      (pad 2 thru_hole oval (at 0 2.54) (size 1.7 1.7) (drill 1.0)
        (layers *.Cu *.Mask)
        (net ${module.pads[1].net_index} ${module.pads[1].net})
      )
      (pad 3 thru_hole oval (at 0 5.08) (size 1.7 1.7) (drill 1.0)
        (layers *.Cu *.Mask)
        (net ${module.pads[2].net_index} ${module.pads[2].net})
      )
      (pad 4 thru_hole oval (at 0 7.62) (size 1.7 1.7) (drill 1.0)
        (layers *.Cu *.Mask)
        (net ${module.pads[3].net_index} ${module.pads[3].net})
      )
      (fp_text user %R (at 0 3.81 90) (layer F.Fab)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (model ${KISYS3DMOD}/Connector_PinHeader_2.54mm.3dshapes/PinHeader_1x04_P2.54mm_Vertical.wrl
        (at (xyz 0 0 0))
        (scale (xyz 1 1 1))
        (rotate (xyz 0 0 0))
      )
    )
  `
}

function Graphics (options) {
  const fabNotes = dent`
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

  return dent`
    (gr_text
      "${fabNotes.replace(/\n/g, NEWLINE)}"
      (at 113.4872 93.2688)
      (layer Dwgs.User)
      (effects (font (size 2.54 2.54) (thickness 0.254)) (justify left))
    )
    (gr_text TEST (at 62 31) (layer F.Cu)
      (effects (font (size 1.5 1.5) (thickness 0.3)))
    )
    (gr_line (start 58 42) (end 58 29) (angle 90) (layer Edge.Cuts) (width 0.15))
    (gr_line (start 74 42) (end 58 42) (angle 90) (layer Edge.Cuts) (width 0.15))
    (gr_line (start 74 29) (end 74 42) (angle 90) (layer Edge.Cuts) (width 0.15))
    (gr_line (start 58 29) (end 74 29) (angle 90) (layer Edge.Cuts) (width 0.15))
  `
}

function Tracks (options) {
  const {
    nets,
    tracks
  } = options

  return tracks
    .map((track, track_index) => {
      const net_index = nets.findIndex(net => net.name === track.net)
      assert(net_index > 0, `tracks[${track_index}].net not found: ${track.net}`)

      return dent`
        (segment
          (start ${track.start[0]} ${track.start[1]})
          (end ${track.end[0]} ${track.end[1]})
          (width ${track.width})
          (layer ${track.layer})
          (net ${net_index})
        )
      `
    })
    .join('\n')
}

function Zones (options) {
  const {
    nets,
    zones
  } = options

  return zones
    .map((zone, zone_index) => {
      const net_index = nets.findIndex(net => net.name === zone.net)
      assert(net_index > 0, `zones[${zone_index}].net not found: ${zone.net}`)

      const hatch_type = Object.keys(zone.hatch)[0]
      return dent`
        (zone
          (net ${net_index})
          (net_name ${zone.net})
          (layer ${zone.layer})
          (hatch ${hatch_type} ${zone.hatch[hatch_type]})
          (connect_pads
            ${Object.keys(zone.connect_pads)
            .map(key => dent`
              (${key} ${zone.connect_pads[key]})
            `)
            .join('\n')
            }
          )
          (min_thickness ${zone.min_thickness})
          (fill 
            ${Object.keys(zone.fill)
            .map(key => dent`
              (${key} ${zone.fill[key]})
            `)
            .join('\n')
            }
          )
          (polygon
            (pts
              ${zone.polygon.pts
              .map(pt => dent`
                (xy ${pt.x} ${pt.y})
              `)
              .join('\n')
              }
            )
          )
        )
      `
    })
    .join('\n')
}
