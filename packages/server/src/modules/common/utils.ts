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
 *    age: 'gt:10:lt:20' // 数字范围
 * }
 */
export function buildWhere(query: Record<string, string | number | boolean | Date | (string | number | boolean | Date)[]>) {
  const ret: Record<string, any> = {}
  Object.keys(query).forEach(key => {
    const value = query[key]
    if (Array.isArray(value)) {
      if (value.length === 2) {
        if (typeof value[0] === Date )
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
export function buildOrder(sorter: string) {
  if (!sorter) return undefined
  // sorter=f1:asc,f2:desc
  const ret: { [key: string]: 'asc' | 'desc' }[] = []
  sorter.split(',').forEach(item => {
    const [field, type] = item.split(':')
    ret.push({
      [field]: ['asc', 'desc'].includes(type)
        ? (type as 'asc' | 'desc')
        // 默认倒序
        : 'desc'
    })
  })
  return ret
}
