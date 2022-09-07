import {
  GeneratorConfig,
  generatorHandler,
  GeneratorManifest,
  GeneratorOptions
} from '@prisma/generator-helper'
import { generateEnums } from './enum.generator'
import { generateResources } from './resource.generator'
import { ask, resolvePath } from './utils'

interface PrismaCustomOptions {
  whitelist?: string
  overwrite?: string
}

generatorHandler({
  onGenerate: async (options: GeneratorOptions) => {
    const generator = options.generator
    const { whitelist } = (generator.config as PrismaCustomOptions)
    let overwrite = false
    if (generator.config.overwrite === 'true') {
      overwrite = true
      console.warn('生成的代码将覆盖原有代码，建议通过 git 检查更新内容。')
    //   const ok = await ask('生成的代码将覆盖原有代码，建议通过 git 检查更新内容，是否继续？')
    //   if (ok) return
    }
    const modulePath = resolvePath('src/modules')
    const { enums, models } = options.dmmf.datamodel
    await generateEnums(enums, modulePath)
    const modelsWhitelist = (whitelist as string | undefined)?.split(',') ?? []
    // 只生成whitelist里的
    await generateResources(
      models.filter(m => modelsWhitelist.includes(m.name)),
      modulePath,
      overwrite
    )
  },
  onManifest(config: GeneratorConfig) {
    return {
      prettyName: 'Pigeon Resource generator',
      version: '0.0.1'
    }
  }
})
