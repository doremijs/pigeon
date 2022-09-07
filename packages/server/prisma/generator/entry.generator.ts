import { readFile, writeFile } from 'fs/promises'
import { GenerateArgs } from './resource.generator'
import { resolvePath } from './utils'

const entryFilePath = resolvePath('src/modules/index.ts')

export async function updateModuleEntries(modules: GenerateArgs[]) {
  const entryContent = await readFile(entryFilePath, 'utf8')
  const [imports, exports] = entryContent.split(
    /\n?export const openedModules = /
  )
  if (imports && exports) {
    const importedModules = imports.trim()
      .split(/\n/)
      .map(item => {
        const matched = item.match(/import \{ (\w+)Module \} from \'([./-\w]+)\'/)
        // console.log(matched, item)
        return matched[1]
      })
    // 只插入没有的
    const insertModules = modules.filter(mod => {
      return !importedModules.includes(mod.pluralizedUpName)
    })
    if (insertModules.length) {
      // const insertIndex = entryContent.match(/\'\n*export const/).index!+1
      await writeFile(
        entryFilePath,
        entryContent
          .replace(
            /\'\n*export const/,
            `'
${insertModules
    .map(
      mod =>
        `import { ${mod.pluralizedUpName}Module } from './${mod.dasherizedName}/${mod.dasherizedName}.module'`
    )
    .join('\n')}

export const`
          )
          .replace(
            /\n\]\n*/,
            `,\n${insertModules
              .map(mod => `  ${mod.pluralizedUpName}Module`)
              .join(',\n')}\n]\n`
          ),
        'utf8'
      )
    }

  }
}
