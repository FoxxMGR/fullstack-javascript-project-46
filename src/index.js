import parser from './parsers.js'

export default function gendiff(filepath1, filepath2, format = 'stylish') {
  return parser(filepath1, filepath2, format)
}
