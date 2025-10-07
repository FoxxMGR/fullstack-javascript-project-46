import process from 'process'
import path from 'path'
import {readFileSync} from 'fs'

export default function parser(filepath1, filepath2) {
  console.log(readFileSync(path.resolve(process.cwd(), filepath1), 'utf8'))
  console.log(readFileSync(path.resolve(process.cwd(), filepath2), 'utf8'))
}
