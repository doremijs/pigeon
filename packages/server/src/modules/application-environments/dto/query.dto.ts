// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsOptional, IsString } from 'class-validator'

export class ApplicationEnvironmentsQueryDto extends CommonQueryDto {
  /**
   * 环境名称
   */
  @IsOptional()
  @IsString()
  name?: string
  @IsOptional()
  @IsString()
  applicationId?: string
}
