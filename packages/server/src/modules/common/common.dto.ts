import { Type } from "class-transformer"
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CommonQueryDto {
  /**
   * 当前页
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number
  /**
   * 每页条数
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number
  /**
   * 排序字段:方法
   * @example sorter=abc,def:asc
   */
  @IsOptional()
  @IsString()
  sorter?: string
  /**
   * 嵌套查询
   * @example include=tags
   */
  @IsOptional()
  @IsString()
  include?: string
}

export class CommonListDto<T> {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  items: T[]
}

/**
 * 批量删除
 */
export class CommonBatchRemoveDto {
  /**
   * ID 数组
   */
  @IsNotEmpty()
  @IsString({ each: true })
  ids: string[]
}
