// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsOptional, IsString } from 'class-validator'

export class ProjectsQueryDto extends CommonQueryDto {
  /**
   * 项目名称
   */
  @IsOptional()
  @IsString()
  name?: string
  /**
   * 项目描述
   */
  @IsOptional()
  @IsString()
  description?: string
  /**
   * 创建人
   */
  @IsOptional()
  @IsString()
  createdBy?: string
}
