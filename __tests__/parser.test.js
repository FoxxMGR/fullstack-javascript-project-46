import { expect, test } from '@jest/globals'
import { readFileSync } from 'fs'
import path from 'path'
import parser from '../src/parsers.js'
import process from 'process'

const getAbsolutePath = (filepath) => {
  return path.resolve(process.cwd(), '__fixtures__', filepath)
}

const readFile = (filepath) => {
  const data = readFileSync(getAbsolutePath(filepath), 'utf8')
  return data
}

test('parserJson', () => {
  const filepath1 = getAbsolutePath('file1.json')
  const filepath2 = getAbsolutePath('file2.json')
  const result = getAbsolutePath('result.txt')
  expect(parser(filepath1, filepath2)).toBe(readFile(result))
})

test('parserYaml', () => {
  const filepath1 = getAbsolutePath('file1.yml')
  const filepath2 = getAbsolutePath('file2.yml')
  const result = getAbsolutePath('result.txt')
  expect(parser(filepath1, filepath2)).toBe(readFile(result))
})
