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
    graphics = [],
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
        graphics,
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
      ${Graphics(graphics)}
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
    graphics,
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
      (drawings ${graphics.length})
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
      (title "${options.title || 'untitled'}")
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

function Modules (options) {
  const {
    modules,
    nets
  } = options

  return modules
    .map((module, module_index) => {
      assert.equal(typeof module, 'object', `modules[${module_index}] is not a valid module: ${module}`)
      assert.equal(typeof module.component, 'object', `modules[${module_index}].component is not a valid component: ${module.component}`)

      const pads = module.pads.map((pad, pad_index) => {
        const net_index = nets.findIndex(net => net.name === pad.net)
        assert(net_index > 0, `modules[${module_index}].pads[${pad_index}].net not found: ${pad.net}`)

        return Object.assign({}, pad, {
          net_index
        })
      })

      module = Object.assign({}, module, { pads })

      return Module(module)
    })
    .join('\n')
}

// 
// https://github.com/KiCad/kicad-footprints/blob/master/Connector_PinHeader_2.54mm.pretty/PinHeader_1x04_P2.54mm_Vertical.kicad_mod
//
function Module (module) {
  return dent`
    (module
      "${module.component.name}"
      (layer ${module.layer})
      (at ${module.at.x || 0} ${module.at.y || 0} ${module.at.angle || 0})
      (desc "${module.component.description || ''}")
      (tags "${module.component.tags || ''}")
      ${Graphics(module.component.graphics(module.graphics))}
      ${module.component.pads
        .map((component_pad, pad_index) => {
          const module_pad = module.pads[pad_index]
          return dent`
            (pad
              ${pad_index + 1}
              ${component_pad.type}
              ${component_pad.shape}
              (at ${component_pad.at.x} ${component_pad.at.y})
              (size ${component_pad.size.x} ${component_pad.size.y})
              (drill ${component_pad.drill})
              (layers ${component_pad.layers})
              (net ${module_pad.net_index} ${module_pad.net})
            )
          `
        })
        .join('\n')
      }
      ${module.component.model != null
        ? dent`
          (model
            ${KISYS3DMOD}/${module.component.model.path}
            (at (xyz ${module.component.model.at.x} ${module.component.model.at.y} ${module.component.model.at.z}))
            (scale (xyz ${module.component.model.at.x} ${module.component.model.at.y} ${module.component.model.at.z}))
            (rotate (xyz ${module.component.model.at.x} ${module.component.model.at.y} ${module.component.model.at.z}))
          )
        `
        : ''
      }
    )
  `
}

function Graphics (graphics) {
  return graphics
    .map((graphic, graphic_index) => {
      switch (graphic.type) {
        case 'text': return dent`
          (gr_text
            "${graphic.content.replace(/\n/g, NEWLINE)}"
            (at ${graphic.at.x} ${graphic.at.y})
            (layer ${graphic.layer})
            (effects
              ${Object.keys(graphic.effects)
              .map(effectKey => {
                const effectValue = graphic.effects[effectKey]
                switch (effectKey) {
                  case 'font': return dent`
                    (font
                      ${Object.keys(effectValue)
                      .map(fontEffectKey => {
                        const fontEffectValue = effectValue[fontEffectKey]
                        switch (fontEffectKey) {
                          case 'size': return dent`
                            (size ${fontEffectValue.x} ${fontEffectValue.y})
                          `
                          default: return dent`
                            (${fontEffectKey} ${fontEffectValue})
                          `
                        }
                      })
                      .join('\n')}
                    )
                  `
                  default: return dent`
                    (${effectKey} ${effectValue})
                  `
                }
              })
              .join('\n')}
            )
          )
        `
        case 'line': return dent`
          (gr_line
            (start ${graphic.start.x} ${graphic.start.y})
            (end ${graphic.end.x} ${graphic.end.y})
            (angle ${graphic.angle})
            (layer ${graphic.layer})
            (width ${graphic.width})
          )
        `
        default:
          assert.fail(`graphics[${graphic_index}].type is unexpected: ${graphic.type}`)
      }
    })
    .join('\n')
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
          (start ${track.start.x} ${track.start.y})
          (end ${track.end.x} ${track.end.y})
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
