import { DMMF } from '@prisma/generator-helper'
import { getEnumTypeName } from './enum.generator'
import { DEFAULT_MODEL_FIELDS } from './utils'
import { ImportArgs } from './utils.generator'

function convertType(type: string) {
  const typeMap = {
    String: 'string',
    Int: 'number',
    BigInt: 'number',
    Decimal: 'number',
    Float: 'number',
    Json: 'object',
    Boolean: 'boolean',
    DateTime: 'Date'
  }
  return typeMap[type] ?? type
}

function convertDefault(
  _default: DMMF.FieldDefault | DMMF.FieldDefaultScalar | DMMF.FieldDefaultScalar[]
) {
  if (Array.isArray(_default)) {
    return _default.join(', ')
  }
  if (typeof _default === 'object') {
    return `${_default.name}(${_default.args.join(', ')})`
  }
  return _default
}

function generateValidators(field: DMMF.Field, allOptional = false): string[] {
  const arr: string[] = []
  const arrayStr = field.isList ? '{ each: true }' : ''
  if (allOptional || !field.isRequired) {
    arr.push('@IsOptional()')
  } else if (!field.isList) {
    arr.push('@IsNotEmpty()')
  }
  if (field.kind === 'enum') {
    arr.push(`@IsEnum(${getEnumTypeName(field.type)})`)
  } else if (field.kind === 'object') {
    arr.push(`@IsObject(${arrayStr})`)
  }
  switch (field.type.toLowerCase()) {
    case 'string':
      arr.push(`@IsString(${arrayStr})`)
      break
    case 'json':
      arr.push(`@IsObject(${arrayStr})`)
      break
    case 'boolean':
      arr.push(`@IsBoolean(${arrayStr})`)
      break
    case 'date':
      arr.push(`@IsDate(${arrayStr})`)
      break
    case 'int':
      arr.push(`@IsInt(${arrayStr})`)
      break
    case 'decimal':
      arr.push(`@IsDecimal(${arrayStr})`)
      break
    case 'bigint':
    case 'float':
      arr.push(`@IsNumber(${arrayStr})`)
      break
  }
  return arr
}

type GenerateDTOArgs = {
  allOptional?: boolean
  appendValidator?: boolean
}

export function generateDTO(fields: DMMF.Field[], args: GenerateDTOArgs = {}) {
  const { allOptional, appendValidator } = Object.assign<
    Partial<GenerateDTOArgs>,
    Partial<GenerateDTOArgs>
  >(
    {
      allOptional: false,
      appendValidator: true
    },
    args
  )
  const arr: string[] = []
  const enumImports: ImportArgs = { pkg: '@prisma/client', exports: [] }
  const validatorImports: ImportArgs = { pkg: 'class-validator', exports: [] }
  const typeImports: ImportArgs = { pkg: 'class-transformer', exports: [] }
  const imports: ImportArgs[] = [typeImports, validatorImports, enumImports]
  for (const field of fields) {
    // object ???????????????
    if (field.kind === 'object' || field.kind === 'unsupported') {
      continue
    }
    if (field.documentation) {
      arr.push(`  /**
   * ${field.documentation}${
        field.hasDefaultValue ? `\n   * @default ${convertDefault(field.default)}` : ''
      }
   */`)
    }
    // ???????????????
    if (field.kind === 'enum') {
      const enumName = getEnumTypeName(field.type)
      // ??????
      if (!enumImports.exports.includes(enumName)) {
        enumImports.exports.push(enumName)
      }
    }
    if (appendValidator) {
      const validators = generateValidators(field, allOptional)
      if (validators.length) {
        arr.push('  ' + validators.join('\n  '))
        for (const validator of validators) {
          // ?????? @ ?????? @ ?????????function
          const name = validator.match(/^@(\w+)\(/)[1]
          // ??????
          if (!validatorImports.exports.includes(name)) {
            validatorImports.exports.push(name)
          }
        }
      }
    }
    // Date ???????????????
    if (field.type === 'DateTime') {
      arr.push('  @Type(() => Date)')
      if (!typeImports.exports.length) {
        typeImports.exports = ['Type']
      }
    }
    // name?: type
    arr.push(
      `  ${field.name}${field.isRequired && allOptional !== true ? '' : '?'}: ${
        field.kind === 'enum' ? getEnumTypeName(field.type) : convertType(field.type)
      }${field.isList ? '[]' : ''}${/** ?????????????????????????????????????????? */
      field.isList && field.kind === 'scalar' ? ' = []' : ''}`
    )
  }
  return { imports, content: arr.join('\n') }
}
