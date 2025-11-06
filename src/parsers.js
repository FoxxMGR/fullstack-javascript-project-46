import process from 'process'
import path from 'path'
import { readFileSync } from 'fs'
import _ from 'lodash'
import yaml from 'js-yaml'
import format from './formaters/formats.js'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const data = readFileSync(absolutePath, 'utf8')

  const extension = path.extname(filepath).toLowerCase()

  switch (extension) {
    case '.json':
      return JSON.parse(data)
    case '.yaml':
    case '.yml':
      return yaml.load(data)
    default:
      throw new Error(`Unknown format: ${extension}`)
  }
}

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2))
  const sortedKeys = _.sortBy(keys)

  return sortedKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      }
    }

    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: value1,
      }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      }
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        value1,
        value2,
      }
    }

    return {
      key,
      type: 'unchanged',
      value: value1,
    }
  })
}

export default function parser(filepath1, filepath2, formatName = 'stylish') {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)
  const tree = buildTree(data1, data2)

  return format(tree, formatName)
}
