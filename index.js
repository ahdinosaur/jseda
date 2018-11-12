const assert = require('assert')
const { join } = require('path')
const dent = require('endent')
const Sexprs = require('sexprs')
const jsStringify = require('stringify-object')
const package = require('./package.json')

const KISYS3DMOD = process.env.KISYS3DMOD || '/usr/share/kicad/modules/packages3d/'

const NOW = (Date.now() / 1000).toString(16).substring(0, 8)
const NEWLINE = 'NEWLINE_NEWLINE_NEWLINE'

module.exports = Jseda

function Jseda (options = {}) {
  const sexprs = Sexprs({
    operators: {
      add_net: {
        hasMany: true
      },
      at: {
        args: ['x', 'y', 'angle']
      },
      end: {
        args: ['x', 'y']
      },
      fp_text: {
        hasMany: true,
        args: ['id', 'content']
      },
      fp_line: {
        hasMany: true
      },
      gr_text: {
        args: ['content'],
        hasMany: true
      },
      gr_line: {
        hasMany: true
      },
      model: {
        args: ['path']
      },
      module: {
        hasMany: true,
        args: ['name']
      },
      net: {
        hasMany: (path) => {
          return path.length == 2
        },
        args: ['index', 'name']
      },
      net_class: {
        hasMany: true,
        args: ['name', 'description']
      },
      pad: {
        hasMany: true,
        args: ['number', 'type', 'shape']
      },
      segment: {
        hasMany: true
      },
      size: {
        args: ['x', 'y']
      },
      start: {
        args: ['x', 'y']
      },
      track: {
        hasMany: true
      },
      user_trace_width: {
        hasMany: true
      },
      user_via: {
        hasMany: true
      },
      xy: {
        hasMany: true,
        args: ['x', 'y']
      },
      xyz: {
        args: ['x', 'y', 'z']
      },
      zone: {
        hasMany: true
      }
    }
  })

  return {
    json,
    js,
    pcb
  }

  function json (string) {
    const object = sexprs.parse(string)
    return JSON.stringify(object, null, 2)
  }

  function js (string) {
    const object = sexprs.parse(string)
    return jsStringify(object, {
      indent: '  '
    })
  }

  function pcb (object) {
    var {
      general = {},
      layers = [],
      net_classes = [],
      nets = [],
      modules = [],
      graphics = [],
      tracks = [],
      zones = []
    } = object

    var {
      setup = {},
      page = 'A4',
      title = 'untitled'
    } = general

    nets = [
      { name: '' },
      ...nets,
    ].map((net, index) => {
      return Object.assign({}, net, { index })
    })

    const pcb_object = {
      kicad_pcb: Object.assign(
        {
          version: 4,
          host: ['pcbnew', `${package.name}-${package.version}`],
          general: {
            links: 0, // TODO ???
            no_connects: 0, // TODO ???
            area: general.area,
            thickness: general.thickness,
            drawings: graphics.length,
            tracks: tracks.length,
            zones: zones.length,
            modules: modules.length,
            nets: nets.length
          },
          page,
          title_block: { title },
          setup,
          layers,
          net_class: net_classes,
          net: nets,
          module: Modules({ modules, nets }),
          track: Tracks({ nets, tracks }),
          zone: Zones({ nets, zones })
        },
        Graphics({ prefix: 'gr', graphics })
      )
    }

    return sexprs.stringify(pcb_object)
  }

  /*
  // HACK (part 1): to have string '\n' in output
  return gr_text.replace(new RegExp('\n', 'g'), NEWLINE)
  // HACK (part 2): to have string '\n' in output
  .replace(new RegExp(NEWLINE, 'g'), '\\n')
  */
}

function Modules (options) {
  const {
    modules,
    nets
  } = options

  return modules.map((module, module_index) => {
    assert.equal(typeof module, 'object', `modules[${module_index}] is not a valid module: ${module}`)
    assert.equal(typeof module.component, 'object', `modules[${module_index}].component is not a valid component: ${module.component}`)

    const pads = module.pads.map((pad, pad_index) => {
      const net_index = nets.findIndex(net => net.name === pad.net.name)
      assert(net_index > 0, `modules[${module_index}].pads[${pad_index}].net not found: ${pad.net}`)

      return Object.assign({}, pad, {
        net: Object.assign({}, pad.net, {
          index: net_index
        })
      })
    })

    module = Object.assign({}, module, { pads })

    return Module(module)
  })
}

function Module (module) {
  module = Object.assign(
    {},
    module,
    {
      name: module.component.name,
      descr: module.component.description,
      tags: module.component.tags,
      pad: module.component.pads.map((component_pad, pad_index) => {
        const module_pad = module.pads[pad_index]
        return Object.assign(
          {},
          component_pad,
          {
            number: pad_index + 1,
            net: module_pad.net
          }
        )
      })
    },
    Graphics({
      prefix: 'fp',
      graphics: module.component.graphics(module)
    }),
    module.component.model == null
      ? {}
      : {
        model: Object.assign(
          {},
          module.component.model,
          {
            path: join(KISYS3DMOD, module.component.model.path)
          }
        )
      }
  )
  delete module.component
  delete module.graphics
  delete module.pads
  return module
}

function Graphics ({ prefix, graphics }) {
  return graphics.reduce(
    (sofar, item) => {
      var clone = Object.assign({}, item)
      const type = clone.type
      delete clone.type

      var key = `${prefix}_${type}`
      if (sofar[key] == null) sofar[key] = []
      sofar[key].push(clone)
      return sofar
    },
    {}
  )
}

function Tracks (options) {
  const {
    nets,
    tracks
  } = options

  return tracks.map((track, track_index) => {
    const net_index = nets.findIndex(net => net.name === track.net.name)
    assert(net_index > 0, `tracks[${track_index}].net not found: ${track.net}`)

    return Object.assign({}, track, { net: { index: net_index } })
  })
}

function Zones (options) {
  const {
    nets,
    zones
  } = options

  return zones.map((zone, zone_index) => {
    const net_index = nets.findIndex(net => net.name === zone.net.name)
    assert(net_index > 0, `zones[${zone_index}].net not found: ${zone.net}`)

    return Object.assign(
      {},
      zone,
      {
        net: { index: net_index },
        net_name: zone.net.name
      }
    )
  })
}
