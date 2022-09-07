// Auto generated
import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateApplicationConfigurationHiostoryDto {
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
  /**
   * 删除人
   */
  @IsNotEmpty()
  @IsString()
  deletedBy: string
}

export class UpdateApplicationConfigurationHiostoryDto extends PartialType(CreateApplicationConfigurationHiostoryDto) {
}

export class ApplicationConfigurationHiostoryModel extends CreateApplicationConfigurationHiostoryDto {
  @IsNotEmpty()
  @IsString()
  id: string
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date
  @IsOptional()
  @Type(() => Date)
  deletedAt?: Date
}

export class ApplicationConfigurationHiostoryListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ApplicationConfigurationHiostoryModel[]
}
