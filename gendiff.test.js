// @ts-check

import { expect, test } from '@jest/globals'
import { readFileSync } from 'fs'
import path from 'path'
import parser from './src/parser.js'
import process from 'process'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const data = readFileSync(absolutePath, 'utf8')
  return data
}

test('parser', () => {
  expect(parser('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(readFile('./__fixtures__/result.txt'))
})
