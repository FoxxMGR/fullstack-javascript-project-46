#!/usr/bin/env node
import parser from '../src/parser.js'
import { Command } from 'commander'

const program = new Command()

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    parser(filepath1, filepath2)
  })

program.parse()
