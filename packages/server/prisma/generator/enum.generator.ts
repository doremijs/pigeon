import { DMMF } from '@prisma/generator-helper'
import { resolve } from 'path'
import { AUTO_GENERATED_BANNER, resolvePath, writeFile } from './utils'

export function getEnumTypeName(enumName: string) {
  return `E${enumName.replace(/^E/, '')}`
}

export function generateEnum(_enum: DMMF.DatamodelEnum) {
  return `export enum ${getEnumTypeName(_enum.name)} {
  ${_enum.values.map(item => item.name).join(',\n  ')}
}`
}

export async function generateEnums(enumList: DMMF.DatamodelEnum[], modulePath: string) {
  const enumFilePath = resolve(modulePath, 'common/enums.ts')
  await writeFile(
    enumFilePath,
    `${AUTO_GENERATED_BANNER}
${enumList.map(generateEnum).join('\n')}
`,
    true
  )
}
