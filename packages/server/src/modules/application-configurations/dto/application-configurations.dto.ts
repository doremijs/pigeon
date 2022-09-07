// Auto generated
import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateApplicationConfigurationDto {
  /**
   * 版本号
   */
  @IsOptional()
  @IsString()
  version?: string
  @IsNotEmpty()
  @IsString()
  applicationEnvironmentId: string
  /**
   * 创建人
   */
  @IsNotEmpty()
  @IsString()
  createdBy: string
}

export class UpdateApplicationConfigurationDto extends PartialType(CreateApplicationConfigurationDto) {
}

export class ApplicationConfigurationModel extends CreateApplicationConfigurationDto {
  @IsNotEmpty()
  @IsString()
  id: string
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date
}

export class ApplicationConfigurationListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ApplicationConfigurationModel[]
}
