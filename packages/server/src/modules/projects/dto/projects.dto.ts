// Auto generated
import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateProjectDto {
  /**
   * 项目名称
   */
  @IsNotEmpty()
  @IsString()
  name: string
  /**
   * 项目描述
   */
  @IsOptional()
  @IsString()
  description?: string
  /**
   * 创建人
   */
  @IsNotEmpty()
  @IsString()
  createdBy: string
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
}

export class ProjectModel extends CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  id: string
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date
  @IsOptional()
  @Type(() => Date)
  deletedAt?: Date
}

export class ProjectListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ProjectModel[]
}
