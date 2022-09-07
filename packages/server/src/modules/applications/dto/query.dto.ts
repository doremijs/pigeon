// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsOptional, IsString } from 'class-validator'

export class ApplicationsQueryDto extends CommonQueryDto {
  /**
   * 应用名称
   */
  @IsOptional()
  @IsString()
  name?: string
  /**
   * 应用描述
   */
  @IsOptional()
  @IsString()
  description?: string
  @IsOptional()
  @IsString()
  projectId?: string
  /**
   * 创建人
   */
  @IsOptional()
  @IsString()
  createdBy?: string
}
