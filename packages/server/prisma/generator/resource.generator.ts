import { DMMF } from '@prisma/generator-helper'
import {
  AUTO_GENERATED_BANNER,
  DEFAULT_MODEL_FIELDS,
  ensureDirIncreasement,
  ExtendedField,
  ExtendedModel,
  preProcessField,
  preProcessModel,
  writeFile
} from './utils'
import { resolve } from 'path'
import {
  pluralize,
  singularize,
  camelize,
  dasherize,
  underscore
} from 'inflected'
import { generateImports, mergeImports } from './utils.generator'
import { generateDTO } from './dto.generator'
import { updateModuleEntries } from './entry.generator'

export type GenerateArgs = {
  model: ExtendedModel
  name: string
  dasherizedName: string
  singularedName: string
  pluralizedName: string
  singularedUpName: string
  pluralizedUpName: string
  subModulePath: string
}

let _writeFile: (filePath: string, content: string) => Promise<void>

export async function generateResources(
  models: DMMF.Model[],
  modulePath: string,
  overwrite: boolean
) {
  _writeFile = (filePath: string, content: string) =>
    writeFile(filePath, content, overwrite)
  const resources: GenerateArgs[] = []
  for (const model of models) {
    // 预处理 fields
    model.fields = model.fields.map(preProcessField)
    resources.push(await generateResource(model, modulePath, overwrite))
  }
  await updateModuleEntries(resources)
}

export async function generateResource(
  _model: DMMF.Model,
  modulePath: string,
  overwrite: boolean
) {
  const model = preProcessModel(_model)
  const name = camelize(model.name, false)
  const singularedName = singularize(name)
  const pluralizedName = pluralize(name)
  const dasherizedName = dasherize(underscore(pluralizedName))
  const singularedUpName = camelize(singularedName)
  const pluralizedUpName = camelize(pluralizedName)
  const subModulePath = overwrite
    ? resolve(modulePath, dasherizedName)
    : await ensureDirIncreasement(resolve(modulePath, dasherizedName))

  const args: GenerateArgs = {
    model,
    name,
    dasherizedName,
    singularedName,
    pluralizedName,
    singularedUpName,
    pluralizedUpName,
    subModulePath
  }

  // 生成 module 文件
  await generateModule(args)

  // 是否有deletedAt且没有unique字段，有则认为该模型是软删除
  const isSoftDelete = !!model.fields.some(field => field.name === 'deletedAt') && model.uniqueFields.length <= 0

  // 生成 controller 文件
  await generateController(model.documentation, args, isSoftDelete)

  // 生成 controller.spec 文件
  await generateControllerSpec(args)

  // 生成 service 文件
  await generateService(args, model, isSoftDelete)

  // 生成 service.spec 文件
  await generateServiceSpec(args)

  // 生成 dto 文件
  await generateModelDTO(args)
  await generateQueryDTO(args)
  return args
}

async function generateModule(args: GenerateArgs) {
  const { subModulePath, pluralizedUpName, dasherizedName } = args
  await _writeFile(
    resolve(subModulePath, `${dasherizedName}.module.ts`),
    `${AUTO_GENERATED_BANNER}
import { Module } from '@nestjs/common'
import { ${pluralizedUpName}Controller } from './${dasherizedName}.controller'
import { ${pluralizedUpName}Service } from './${dasherizedName}.service'

@Module({
  providers: [${pluralizedUpName}Service],
  controllers: [${pluralizedUpName}Controller],
  exports: [${pluralizedUpName}Service]
})
export class ${pluralizedUpName}Module {}
`
  )
}

async function generateController(cnName: string, args: GenerateArgs, isSoftDelete: boolean) {
  const {
    model,
    subModulePath,
    dasherizedName,
    pluralizedName,
    pluralizedUpName,
    singularedUpName
  } = args
  // 生成 controller 文件
  await _writeFile(
    resolve(subModulePath, `${dasherizedName}.controller.ts`),
    `${AUTO_GENERATED_BANNER}
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ${pluralizedUpName}Service } from './${dasherizedName}.service'
import {
  Create${singularedUpName}Dto,
  Update${singularedUpName}Dto,
  ${singularedUpName}Model,
  ${singularedUpName}ListDto
} from './dto/${dasherizedName}.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { ${pluralizedUpName}QueryDto } from './dto/query.dto'

@Controller('${dasherizedName}')
@ApiTags('${cnName}')
export class ${pluralizedUpName}Controller {
  constructor(private readonly ${pluralizedName}Service: ${pluralizedUpName}Service) {}

  @PigeonAction('POST', '', '创建${cnName}')
  @ApiBody({ type: Create${singularedUpName}Dto })
  @ApiCreatedResponse({ type: ${singularedUpName}Model })
  create(@Body() create${singularedUpName}Dto: Create${singularedUpName}Dto) {
    return this.${pluralizedName}Service.create(create${singularedUpName}Dto)
  }

  @PigeonAction('GET', '', '查询${cnName}列表'${model.public ? ', { public: true }' : ''})
  @ApiOkResponse({ type: ${singularedUpName}ListDto })
  findMany(@Query() query: ${pluralizedUpName}QueryDto) {
    return this.${pluralizedName}Service.findMany(query)
  }${model.viewAll ? `

  @PigeonAction('GET', 'all', '查询所有${cnName}'${model.public ? ', { public: true }' : ''})
  @ApiOkResponse({ type: [${singularedUpName}Model] })
  findAll(@Query() query: ${pluralizedUpName}QueryDto) {
    return this.${pluralizedName}Service.findAll(query)
  }` : ''}

  // TODO 导出

  @PigeonAction('GET', ':id', '查询${cnName}详情'${model.public ? ', { public: true }' : ''})
  @ApiOkResponse({ type: ${singularedUpName}Model })
  findOne(@Param('id') id: string) {
    return this.${pluralizedName}Service.findOne(id)
  }

  @PigeonAction('PATCH', ':id', '更新${cnName}')
  @ApiBody({ type: Update${singularedUpName}Dto })
  @ApiOkResponse({ type: ${singularedUpName}Model })
  update(@Param('id') id: string, @Body() update${singularedUpName}Dto: Update${singularedUpName}Dto) {
    return this.${pluralizedName}Service.update(id, update${singularedUpName}Dto)
  }

  ${isSoftDelete ? `@PigeonAction('DELETE', 'batch/s', '批量逻辑删除${cnName}')
  batchSoftRemove(@Body() body: CommonBatchRemoveDto) {
    return this.${pluralizedName}Service.batchSoftRemove(body.ids)
  }` :

  `@PigeonAction('DELETE', 'batch', '批量删除${cnName}')
  batchRemove(@Body() body: CommonBatchRemoveDto) {
    return this.${pluralizedName}Service.batchRemove(body.ids)
  }`
  }

  ${isSoftDelete ? `@PigeonAction('DELETE', ':id/s', '逻辑删除${cnName}')
  softRemove(@Param('id') id: string) {
    return this.${pluralizedName}Service.softRemove(id)
  }` :

  `@PigeonAction('DELETE', ':id', '删除${cnName}')
  remove(@Param('id') id: string) {
    return this.${pluralizedName}Service.remove(id)
  }`
  }
}
`
  )
}

async function generateControllerSpec(args: GenerateArgs) {
  const { subModulePath, pluralizedUpName, dasherizedName } = args
  await _writeFile(
    resolve(subModulePath, `${dasherizedName}.controller.spec.ts`),
    `${AUTO_GENERATED_BANNER}
import { Test, TestingModule } from '@nestjs/testing'
import { ${pluralizedUpName}Controller } from './${dasherizedName}.controller'
import { ${pluralizedUpName}Service } from './${dasherizedName}.service'

describe('${pluralizedUpName}Controller', () => {
  let controller: ${pluralizedUpName}Controller

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${pluralizedUpName}Controller],
      providers: [${pluralizedUpName}Service]
    }).compile()

    controller = module.get<${pluralizedUpName}Controller>(${pluralizedUpName}Controller)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
`
  )
}

async function generateService(args: GenerateArgs, model: DMMF.Model, isSoftDelete: boolean) {
  const {
    subModulePath,
    dasherizedName,
    pluralizedUpName,
    singularedName,
    singularedUpName
  } = args
  const allRelations = model.fields.reduce<string[]>((arr, cur) => {
    if (cur.relationName) {
      arr.push(cur.name)
    }
    return arr
  }, [])
  await _writeFile(
    resolve(subModulePath, `${dasherizedName}.service.ts`),
    `${AUTO_GENERATED_BANNER}
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { Create${singularedUpName}Dto, Update${singularedUpName}Dto } from './dto/${dasherizedName}.dto'
import { ${pluralizedUpName}QueryDto } from './dto/query.dto'

@Injectable()
export class ${pluralizedUpName}Service {
  constructor(private readonly prisma: PrismaService) {}

  create(create${singularedUpName}Dto: Create${singularedUpName}Dto) {
    return this.prisma.${singularedName}.create({ data: create${singularedUpName}Dto })
  }

  async findMany(queryDto: ${pluralizedUpName}QueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.${singularedUpName}WhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.${singularedName}.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter)${
        allRelations.length
          ? `,
      include: {
        ${allRelations.join(`: true,
        `)}: true
      }`
          : ''
      }
    })
    const total = await this.prisma.${singularedName}.count({ where })
    return { total, data }
  }${model.viewAll ? `

  async findAll(queryDto: ${pluralizedUpName}QueryDto) {
    const where: Prisma.${singularedUpName}WhereInput = {
      deletedAt: null,
      ...queryDto
    }
    const data = await this.prisma.${singularedName}.findMany({
      where${
        allRelations.length
          ? `,
      include: {
        ${allRelations.join(`: true,
        `)}: true
      }`
          : ''
      }
    })
    return { total: data.length, data }
  }` : ''}

  findOne(id: string) {
    return this.prisma.${singularedName}.findUnique({
      where: { id }${
        allRelations.length
          ? `,
      include: {
        ${allRelations.join(`: true,
        `)}: true
      }`
          : ''
      }
    })
  }

  update(id: string, update${singularedUpName}Dto: Update${singularedUpName}Dto) {
    return this.prisma.${singularedName}.update({
      data: update${singularedUpName}Dto,
      where: { id }
    })
  }

  ${isSoftDelete ? `softRemove(id: string) {
    return this.prisma.${singularedName}.update({
      data: { deletedAt: new Date() },
      where: { id }
    })
  }` :
  `remove(id: string) {
    return this.prisma.${singularedName}.delete({
      where: { id }
    })
  }`}

  ${isSoftDelete ? `batchSoftRemove(ids: string[]) {
    return this.prisma.${singularedName}.updateMany({
      data: { deletedAt: new Date() },
      where: {
        id: {
          in: ids
        }
      }
    })
  }` :
  `batchRemove(ids: string[]) {
    return this.prisma.${singularedName}.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }`}
}
`
  )
}

async function generateServiceSpec(args: GenerateArgs) {
  const { subModulePath, dasherizedName, pluralizedUpName } = args
  await _writeFile(
    resolve(subModulePath, `${dasherizedName}.service.spec.ts`),
    `${AUTO_GENERATED_BANNER}
import { Test, TestingModule } from '@nestjs/testing'
import { ${pluralizedUpName}Service } from './${dasherizedName}.service'

describe('${pluralizedUpName}Service', () => {
  let service: ${pluralizedUpName}Service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [${pluralizedUpName}Service]
    }).compile()

    service = module.get<${pluralizedUpName}Service>(${pluralizedUpName}Service)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
`
  )
}

async function generateModelDTO(args: GenerateArgs) {
  const { subModulePath, model, singularedUpName, dasherizedName } = args
  const createFields: ExtendedField[] = []
  const updateFields: ExtendedField[] = []
  const modelFields: ExtendedField[] = []
  for (const field of (model.fields as ExtendedField[])) {
    // 创建的字段忽略 id、系统默认维护的字段以及标记为创建时忽略的字段
    if (field.isId || DEFAULT_MODEL_FIELDS.includes(field.name)) {
      modelFields.push(field)
    } else {
      if (field.createIgnore) {
        modelFields.push(field)
        if (!field.updateIgnore) {
          updateFields.push(field)
        }
      } else {
        createFields.push(field)
      }
    }
  }
  const createDto = generateDTO(createFields)
  const updateDto = generateDTO(updateFields)
  const modelDto = generateDTO(modelFields)
  // 合并
  const mergedImports = mergeImports(createDto.imports, updateDto.imports, modelDto.imports)
  await _writeFile(
    resolve(subModulePath, `dto/${dasherizedName}.dto.ts`),
    `${AUTO_GENERATED_BANNER}
import { PartialType } from '@nestjs/swagger'${
  mergedImports.length
        ? `
${generateImports(mergedImports)}`
        : ''
    }

export class Create${singularedUpName}Dto {${
  createDto.content ? `
${createDto.content}` : ''}
}

export class Update${singularedUpName}Dto extends PartialType(Create${singularedUpName}Dto) {${
  updateDto.content ? `
${updateDto.content}` : ''}
}

export class ${singularedUpName}Model extends Create${singularedUpName}Dto {${
  modelDto.content ? `
${modelDto.content}` : ''}
}

export class ${singularedUpName}ListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ${singularedUpName}Model[]
}
`
  )
}

async function generateQueryDTO(args: GenerateArgs) {
  const { subModulePath, model, pluralizedUpName } = args
  const searchableFields = (model.fields as ExtendedField[]).filter(
    field => !field.isId && !DEFAULT_MODEL_FIELDS.includes(field.name) && !field.isList && !field.hideInSearch
  )
  const { imports, content } = generateDTO(searchableFields, {
    allOptional: true
  })

  await _writeFile(
    resolve(subModulePath, `dto/query.dto.ts`),
    `${AUTO_GENERATED_BANNER}
import { CommonQueryDto } from '@/modules/common/common.dto'${
      imports.length
        ? `
${generateImports(imports)}`
        : ''
    }

export class ${pluralizedUpName}QueryDto extends CommonQueryDto {
${content}
}
`
  )
}
