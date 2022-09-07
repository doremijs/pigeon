// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsOptional, IsString, IsInt } from 'class-validator'

export class MenusQueryDto extends CommonQueryDto {
  /**
   * 名称
   */
  @IsOptional()
  @IsString()
  name?: string
  /**
   * 地址
   */
  @IsOptional()
  @IsString()
  url?: string
  /**
   * 父菜单ID
   */
  @IsOptional()
  @IsString()
  parentId?: string
  /**
   * 排序
   */
  @IsOptional()
  @IsInt()
  sort?: number
}
