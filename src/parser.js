import process from 'process'
import path from 'path'
import { readFileSync } from 'fs'
import _ from 'lodash'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const data = readFileSync(absolutePath, 'utf8')
  return JSON.parse(data)
}
const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.sortBy(_.union(keys1, keys2))

  const diffLines = allKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return `  + ${key}: ${value2}`
    }

    if (!_.has(data2, key)) {
      return `  - ${key}: ${value1}`
    }

    if (value1 !== value2) {
      return [`  - ${key}: ${value1}`, `  + ${key}: ${value2}`].join('\n')
    }

    return `    ${key}: ${value1}`
  })

  return `{\n${diffLines.join('\n')}\n}`
}
export default function parser(filepath1, filepath2) {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)
  return buildDiff(data1, data2)
}
