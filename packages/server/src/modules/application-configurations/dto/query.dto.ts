// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsOptional, IsString } from 'class-validator'

export class ApplicationConfigurationsQueryDto extends CommonQueryDto {
  /**
   * 版本号
   */
  @IsOptional()
  @IsString()
  version?: string
  @IsOptional()
  @IsString()
  applicationEnvironmentId?: string
  /**
   * 创建人
   */
  @IsOptional()
  @IsString()
  createdBy?: string
}
