const KISYS3DMOD = process.env.KISYS3DMOD || '/usr/share/kicad/modules/packages3d/'

module.exports = {
  Pcb
}

function Pcb () {
  return `
    (kicad_pcb
      ${Header({})}
      ${General({})}
      ${Page({})}
      ${Layers({})}
      ${Setup({})}
      ${Nets({})}
      ${Modules({})}
      ${Graphics({})}
      ${Tracks({})}
      ${Zones({})}
    )
  `
}

function Header (options) {
  return `
    (version 4)
    (host pcbnew "kicad-js")
  `
}

function General (options) {
  return `
    (general
      (links 0)
      (no_connects 0)
      (area 104.572999 74.854999 178.510001 123.265001)
      (thickness 1.6)
      (drawings 1)
      (tracks 0)
      (zones 0)
      (modules 0)
      (nets 1)
    )
  `
}

function Page (options) {
  return `
    (page A4)
    (title_block
      (title "Project Title")
    )
  `
}

function Layers (options) {
  return `
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
  return `
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
  return `
    (net 0 "")
    (net 1 /SIGNAL)
    (net 2 GND)
    (net_class Default "This is the default net class."
      (clearance 0.254)
      (trace_width 0.254)
      (via_dia 0.6858)
      (via_drill 0.3302)
      (uvia_dia 0.6858)
      (uvia_drill 0.3302)
    )
  `
}

function Modules (options) {
}

// 
// https://github.com/KiCad/kicad-footprints/blob/master/Connector_PinHeader_2.54mm.pretty/PinHeader_1x04_P2.54mm_Vertical.kicad_mod
//
function PinHeader_1x04_P254mm_Vertical (options) {
  return `
    (module PinHeader_1x04_P2.54mm_Vertical (layer F.Cu) (tedit 59FED5CC)
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
      (pad 1 thru_hole rect (at 0 0) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask))
      (pad 2 thru_hole oval (at 0 2.54) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask))
      (pad 3 thru_hole oval (at 0 5.08) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask))
      (pad 4 thru_hole oval (at 0 7.62) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask))
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
  const fabNotes = `
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

  return `
    (gr_text
      "${fabNotes}"
      (at 113.4872 93.2688)
      (layer Dwgs.User)
      (effects (font (size 2.54 2.54) (thickness 0.254)) (justify left))
    )

    (gr_text TEST (at 62 31) (layer top_side.Cu)
      (effects (font (size 1.5 1.5) (thickness 0.3)))
    )
    (gr_line (start 58 42) (end 58 29) (angle 90) (layer Edge.Cuts) (width 0.15))
    (gr_line (start 74 42) (end 58 42) (angle 90) (layer Edge.Cuts) (width 0.15))
    (gr_line (start 74 29) (end 74 42) (angle 90) (layer Edge.Cuts) (width 0.15))
    (gr_line (start 58 29) (end 74 29) (angle 90) (layer Edge.Cuts) (width 0.15))
  `
}

function Tracks (options) {
  return `
    (segment (start 61.0616 36.8808) (end 61.0616 34.5186) (width 0.254) (layer bottom_side.Cu) (net 1))
    (segment (start 61.0616 34.5186) (end 62.23 33.3502) (width 0.254) (layer bottom_side.Cu) (net 1) (tstamp 5127A159))
    (segment (start 69.85 33.3502) (end 70.993 33.3502) (width 0.5) (layer bottom_side.Cu) (net 2))
    (segment (start 71.2216 33.5788) (end 71.2216 36.8808) (width 0.5) (layer bottom_side.Cu) (net 2) (tstamp 5127A156))
    (segment (start 70.993 33.3502) (end 71.2216 33.5788) (width 0.5) (layer bottom_side.Cu) (net 2) (tstamp 5127A155))
  `
}

function Zones (options) {
  return `
    (zone
      (net 2)
      (net_name GND)
      (layer bottom_side.Cu)
      (tstamp 5127A1B2)
      (hatch edge 0.508)
      (connect_pads (clearance 0.2))
      (min_thickness 0.1778)
      (fill (arc_segments 16) (thermal_gap 0.254) (thermal_bridge_width 0.4064))
      (polygon
        (pts
          (xy 59 30) (xy 73 30) (xy 73 41) (xy 59 41)
        )
      )
    )
  `
}
