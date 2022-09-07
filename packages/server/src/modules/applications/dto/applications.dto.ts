// Auto generated
import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateApplicationDto {
  /**
   * 应用名称
   */
  @IsNotEmpty()
  @IsString()
  name: string
  /**
   * 应用描述
   */
  @IsOptional()
  @IsString()
  description?: string
  @IsNotEmpty()
  @IsString()
  projectId: string
  /**
   * 创建人
   */
  @IsNotEmpty()
  @IsString()
  createdBy: string
}

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
}

export class ApplicationModel extends CreateApplicationDto {
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

export class ApplicationListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ApplicationModel[]
}
