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

const formats = ['stylish', 'plain', 'json']
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
