#!/usr/bin/env node

const { argv, cwd } = process
const { join } = require('path')
const assert = require('assert')
const { writeFileSync } = require('fs')
const dent = require('endent')
const parse_args = require('minimist')

const { Pcb } = require('./')

var args = parse_args(argv.slice(2))
var command_name = args._[0]
var input_file = args._[1]
var output_file = args._[2]

var commands = {
  pcb: Pcb
}

main()

function main () {
  if (command_name == null || input_file == null || args.h || args.help) {
    console.log(usage())
    return
  }

  var command = commands[command_name]
  if (command == null) {
    console.error(`jseda: command not found: ${command_name}`)
    return
  }

  try {
    var input = require(join(cwd(), input_file))
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error(`jseda: input file not found: ${input_file}`)
      console.log(usage())
      return
    } else {
      throw err
    }
  }

  var output = command(input)

  if (output_file == null) {
    console.log(output)
  } else {
    writeFileSync(output_file, output, 'utf8')
  }
}

function usage () {
  return dent`
    jseda <command> <input_file> [<output_file>]

      Commands:

        - pcb


      Examples:

        jseda pcb ./example/index.js ./example/example.kicad_pcb

        jseda pcb ./example/index.js > ./exmple/example.kicad_pcb
  `
}
