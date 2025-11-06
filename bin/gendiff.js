#!/usr/bin/env node
import parser from '../src/parsers.js'
import { Command } from 'commander'

const program = new Command()

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, { format }) => console.log(parser(filepath1, filepath2, format)))

program.parse()

export default function gendiff(filepath1, filepath2, format = 'stylish') {
  return parser(filepath1, filepath2, format)
}
