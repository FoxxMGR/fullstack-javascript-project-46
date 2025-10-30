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

// const getFixture = filepath =>
//   readFileSync(getAbsolutePath(filepath), 'utf8')

// test('parserJson', () => {
//   const filepath1 = getAbsolutePath('fileTree1.json')
//   const filepath2 = getAbsolutePath('fileTree2.json')
//   const result = getAbsolutePath('resultTree.txt')
//   expect(parser(filepath1, filepath2)).toBe(readFile(result))
// })

// test('parserYaml', () => {
//   const filepath1 = getAbsolutePath('fileTree1.yml')
//   const filepath2 = getAbsolutePath('fileTree2.yml')
//   const result = getAbsolutePath('resultTree.txt')
//   expect(parser(filepath1, filepath2)).toBe(readFile(result))
// })

const formats = ['stylish', 'plain']
const extensions = ['json', 'yml']

formats.forEach((format) => {
  extensions.forEach((ext) => {
    test(`${ext.toUpperCase()} files with ${format} format`, () => {
      const result = parser(
        getAbsolutePath(`fileTree1.${ext}`),
        getAbsolutePath(`fileTree2.${ext}`),
        format,
      )
      expect(result).toBe(readFile(`result${format}.txt`))
    })
  })
})
