// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsOptional, IsString } from 'class-validator'

export class ConfigMapsQueryDto extends CommonQueryDto {
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
