export type ImportArgs = {
  pkg: string
  exports: string[]
}

export function generateImports(imports: ImportArgs[]) {
  return imports
    .reduce<string[]>((arr, imp) => {
      if (imp.exports.length) {
        arr.push(`import { ${imp.exports.join(', ')} } from '${imp.pkg}'`)
      }
      return arr
    }, [])
    .join('\n')
}

/**
 * 导入的合并
 */
export function mergeImports(...importsArr: ImportArgs[][]) {
  const retObj: Record<string, ImportArgs['exports']> = {}
  for (const imports of importsArr) {
    for (const imp of imports) {
      retObj[imp.pkg] = [
        ...new Set([...imp.exports, ...(retObj[imp.pkg] ?? [])])
      ]
    }
  }
  return Object.keys(retObj).map<ImportArgs>(k => ({
    pkg: k,
    exports: retObj[k]
  }))
}
