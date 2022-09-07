import { writeFile as _writeFile, ensureFile, ensureDir } from 'fs-extra'
import { access } from 'fs/promises'
import { constants } from 'fs'
import { createInterface } from 'readline'
import { parse, resolve } from 'path'
import { DMMF } from '@prisma/generator-helper'

export const AUTO_GENERATED_BANNER = '// Auto generated'

export const DEFAULT_MODEL_FIELDS = ['createdAt', 'updatedAt', 'deletedAt']

export function resolvePath(...path: string[]) {
  return resolve(__dirname, '../../', ...path)
}

export function exist(filePath: string) {
  return access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

export async function writeFile(filePath: string, content: string, override = false) {
  let fileExisted = await exist(filePath)
  if (override || !fileExisted) {
    await ensureFile(filePath)
    await _writeFile(filePath, content, 'utf8')
    return
  }
  let index = 0
  let targetFilePath = filePath
  const file = parse(filePath)
  while (fileExisted) {
    index += 1
    targetFilePath = resolve(filePath, '../', `${file.name}_${index}.${file.ext}`)
    fileExisted = await exist(targetFilePath)
  }
  await ensureFile(filePath)
  await _writeFile(targetFilePath, content, 'utf8')
}

export async function ensureDirIncreasement(dirPath: string) {
  let targetDirPath = dirPath
  let dirExisted = await exist(dirPath)
  let index = 0
  const dir = parse(dirPath)
  while (dirExisted) {
    index += 1
    targetDirPath = resolve(dirPath, '../', `${dir.name}_${index}`)
    dirExisted = await exist(targetDirPath)
  }
  await ensureDir(targetDirPath)
  return targetDirPath
}

export async function ask(question: string) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      if (['y', 'yes'].includes(answer.toLowerCase())) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

export type ExtendedModel = DMMF.Model & {
  public?: boolean
  viewAll?: boolean
}

/**
 * 预处理字段 model 的 description
 */
 export function preProcessModel(model: DMMF.Model): ExtendedModel {
  let comment = model.documentation
  if (!comment) return model
  if (comment.match(/.*(public)/)) {
    model.public = true
    comment = comment.replace(/ *public */, '')
  }
  if (comment.match(/.*(viewAll)/)) {
    model.viewAll = true
    comment = comment.replace(/ *viewAll */, '')
  }
  model.documentation = comment
  return model
}

export type ExtendedField = DMMF.Field & {
  hideInSearch?: boolean
  hideInTable?: boolean
  createIgnore?: boolean
  updateIgnore?: boolean
}

/**
 * 预处理字段 field 的 description
 */
export function preProcessField(field: DMMF.Field): ExtendedField {
  let comment = field.documentation
  if (!comment) return field
  if (comment.match(/.*(hideInSearch)/)) {
    field.hideInSearch = true
    comment = comment.replace(/ *hideInSearch */, '')
  }
  if (comment.match(/.*(hideInTable)/)) {
    field.hideInTable = true
    comment = comment.replace(/ *hideInTable */, '')
  }
  if (comment.match(/.*(createIgnore)/)) {
    field.createIgnore = true
    comment = comment.replace(/ *createIgnore */, '')
  }
  if (comment.match(/.*(updateIgnore)/)) {
    field.updateIgnore = true
    comment = comment.replace(/ *updateIgnore */, '')
  }
  field.documentation = comment
  return field
}
