export type WhereQuery = Record<
  string,
  null | string | number | boolean | Date | (string | number | Date)[]
>

/**
 * 根据查询对象生存查询条件
 * @param query 查询对象
 * @returns where条件
 * @example
 * {
 *    categoryId: 'xxx', // 精确查询
 *    name: '*任务*', // 左右模糊查询
 *    publishedAt: ['2022-05-01', '2022-12-30'], 时间范围查询
 *    id: 'xxxx,xxxx', // 范围查询
 *    age: 'gt:10;lt:20' // 数字范围
 * }
 */
export function buildWhere(query?: WhereQuery) {
  if (!query) return undefined
  const ret: Record<string, any> = {}
  Object.keys(query).forEach(key => {
    const value = query[key]
    // null
    if (value === null) {
      ret[key] = null
      return
    }
    // 数组
    if (Array.isArray(value)) {
      // FIXME: 判断是否是时间数组
      if (value[0] instanceof Date) {
        // 仅支持2位
        const [start, end] = value
        const queryObj = {}
        if (start) {
          queryObj['gte'] = start
        }
        if (end) {
          queryObj['lte'] = end
        }
        ret[key] = queryObj
      } else {
        // 数字 字符 数组 全部判断为 in
        ret[key] = { in: value }
      }
    } else {
      if (typeof value === 'string') {
        // *keyword*
        const likeMatched = value.match(/^(\**).+?(\**)$/)
        if (likeMatched) {
          const [keyword, start, end] = likeMatched
          if (start || end) {
            // 左右 like
            if (start && end) {
              ret[key] = {
                contains: keyword
              }
            } else if (start) {
              // 左 like
              ret[key] = {
                startsWith: keyword
              }
            } else {
              // 右 like
              ret[key] = {
                endsWith: keyword
              }
            }
            return
          }
        }
        // abc,def
        if (value.includes(',')) {
          ret[key] = {
            // TODO 是否需要做数字转化
            in: value.split(',')
          }
          return
        }
        // gte:xxx;lt:ccc
        if (value.match(/^(lt|gt)/)) {
          value.split(';').forEach(cond => {
            const matched = cond.match(/^(gte?|lte?):(.*)$/)
            if (matched) {
              ret[key] = {
                [matched[1]]: matched[2]
              }
            }
          })
          return
        }
        ret[key] = value
      } else {
        ret[key] = value
      }
    }
  })
  return ret
}

/**
 * 根据参数返回排序规则
 * @param sorter 排序语法
 * @returns 排序规则
 */
export function buildOrder(sorter?: string) {
  if (!sorter) return undefined
  // sorter=f1:asc,f2:desc
  const ret: { [key: string]: 'asc' | 'desc' }[] = []
  sorter.split(',').forEach(item => {
    const [field, type] = item.split(':')
    ret.push({
      [field]: ['asc', 'desc'].includes(type)
        ? (type as 'asc' | 'desc')
        : // 默认倒序
          'desc'
    })
  })
  return ret
}

/**
 * 根据参数构建include条件，只支持2级嵌套
 * @example posts?include=category.name;tag;authors:name,id
 */
export function buildInclude(include: string) {
  if (!include) return undefined
  const entities = include.split(';')
  const ret: Record<string, any> = {}
  entities.forEach(item => {
    buildIncludeItem(ret, item)
  })
  return ret
}

function buildIncludeItem(
  parentObj: Record<string, any>,
  item: string,
  parentKey?: string
) {
  const arrayMatched = item.match(/^(.+?)\[(.+?)]$/)
  if (arrayMatched) {
    const [_, key, items] = arrayMatched
    buildIncludeItem(parentObj, items, key)
  } else {
    if (item.includes(':')) {
      const [key, value] = item.split(':')
      buildIncludeItem(parentObj, value, key)
    } else if (item.includes('.')) {
      const [_, key, rest] = item.match(/^(.+?)\.(.+)$/)
      buildIncludeItem(parentObj, rest, key)
    } else if (item.includes(',')) {
      const items = item.split(',')
      parentObj[parentKey!] = {
        select: items.reduce((obj, it) => {
          obj[it] = true
          return obj
        }, {})
      }
    } else {
      if (parentKey) {
        parentObj[parentKey] = { select: { [item]: true } }
      } else {
        parentObj[item] = true
      }
    }
  }
}
