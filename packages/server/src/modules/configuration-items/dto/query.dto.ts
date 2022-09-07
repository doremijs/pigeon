// Auto generated
import { CommonQueryDto } from '@/modules/common/common.dto'
import { IsOptional, IsString, IsEnum } from 'class-validator'
import { EConfigurationValueType } from '@prisma/client'

export class ConfigurationItemsQueryDto extends CommonQueryDto {
  /**
   * 键
   */
  @IsOptional()
  @IsString()
  key?: string
  /**
   * 值类型
   */
  @IsOptional()
  @IsEnum(EConfigurationValueType)
  valueType?: EConfigurationValueType
  /**
   * 值
   */
  @IsOptional()
  @IsString()
  value?: string
  @IsOptional()
  @IsString()
  configMapId?: string
  @IsOptional()
  @IsString()
  applicationConfigurationId?: string
  @IsOptional()
  @IsString()
  applicationConfigurationHistoryId?: string
  /**
   * 创建人
   */
  @IsOptional()
  @IsString()
  createdBy?: string
}
