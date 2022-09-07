// Auto generated
import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateConfigMapDto {
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

export class UpdateConfigMapDto extends PartialType(CreateConfigMapDto) {
}

export class ConfigMapModel extends CreateConfigMapDto {
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

export class ConfigMapListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ConfigMapModel[]
}
