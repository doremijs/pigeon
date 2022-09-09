// Auto generated
import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator'
import { EConfigurationValueType } from '@prisma/client'

export class CreateConfigurationItemDto {
  /**
   * 键
   */
  @IsNotEmpty()
  @IsString()
  key: string
  /**
   * 值类型
   */
  @IsNotEmpty()
  @IsEnum(EConfigurationValueType)
  valueType: EConfigurationValueType
  /**
   * 值
   */
  @IsNotEmpty()
  @IsString()
  value: string
  @IsNotEmpty()
  @IsString()
  configMapId?: string
  @IsNotEmpty()
  @IsString()
  applicationConfigurationId?: string
  @IsNotEmpty()
  @IsString()
  applicationConfigurationHistoryId?: string
}

export class UpdateConfigurationItemDto extends PartialType(CreateConfigurationItemDto) {
}

export class ConfigurationItemModel extends CreateConfigurationItemDto {
  @IsNotEmpty()
  @IsString()
  id: string
  /**
   * 创建人
   */
  @IsNotEmpty()
  @IsString()
  createdBy: string
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date
}

export class ConfigurationItemListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ConfigurationItemModel[]
}
