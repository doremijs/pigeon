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
  /**
   * 环境描述
   */
  @IsOptional()
  @IsString()
  description?: string
  /**
   * web域名匹配规则
   */
  @IsOptional()
  @IsString()
  domainRule?: string
  @IsOptional()
  @IsString()
  applicationId?: string
  /**
   * 创建人
   */
  @IsOptional()
  @IsString()
  createdBy?: string
}
