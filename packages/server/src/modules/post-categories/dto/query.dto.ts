// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsOptional, IsString, IsInt } from 'class-validator'

export class PostCategoriesQueryDto extends CommonQueryDto {
  /**
   * 分类名
   */
  @IsOptional()
  @IsString()
  name?: string
  /**
   * 排序，越大越靠前
   */
  @IsOptional()
  @IsInt()
  sort?: number
}
