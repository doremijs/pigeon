// Auto generated
import { ConfigurationItem } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateApplicationConfigurationHistoryDto {
  /**
   * 版本号
   */
  @IsOptional()
  @IsString()
  version?: string
  /**
   * 配置项列表
   */
  configurations: ConfigurationItem[]
  @IsNotEmpty()
  @IsString()
  applicationEnvironmentId: string
}

export class ApplicationConfigurationHistoryModel extends CreateApplicationConfigurationHistoryDto {
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
  deletedAt?: Date
}

export class ApplicationConfigurationHistoryListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ApplicationConfigurationHistoryModel[]
}
