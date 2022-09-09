// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ApplicationsQueryDto extends CommonQueryDto {
  /**
   * 应用名称
   */
  @IsOptional()
  @IsString()
  name?: string
  @IsNotEmpty()
  @IsString()
  projectId: string
}
